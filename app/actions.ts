'use server';

import nodemailer from 'nodemailer';

export type BookingState = { ok: boolean; error?: string } | null;

const isEmail = (s: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s);

export async function sendBooking(_prev: BookingState, formData: FormData): Promise<BookingState> {
  // honeypot: real users never fill this hidden field; bots do — accept silently and drop it
  if (((formData.get('company') as string) || '').trim()) return { ok: true };

  const name = ((formData.get('name') as string) || '').trim();
  const email = ((formData.get('email') as string) || '').trim();
  if (!name || !isEmail(email)) return { ok: false, error: 'Please add your name and a valid email.' };

  const type = ((formData.get('type') as string) || '').trim();
  const date = ((formData.get('date') as string) || '').trim();
  const vision = ((formData.get('vision') as string) || '').trim();

  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;
  if (!user || !pass) {
    console.error('[booking] mail not configured (MAIL_USER/MAIL_PASS missing)');
    return { ok: false, error: 'The form is not wired up yet. Please email mythmakerburn@gmail.com.' };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'mail.smtp2go.com',
    port: Number(process.env.MAIL_PORT || 587),
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: process.env.BOOKING_FROM || 'MythMaker Site <noreply@novadiem.com>',
      to: process.env.BOOKING_TO || 'mythmakerburn@gmail.com',
      replyTo: `${name} <${email}>`,
      subject: `Booking enquiry — ${name}${type ? ` · ${type}` : ''}`,
      text: [
        'A new enquiry came in through the MythMaker site.',
        '',
        `Name:   ${name}`,
        `Email:  ${email}`,
        `Event:  ${type || '—'}`,
        `When:   ${date || '—'}`,
        '',
        'Vision:',
        vision || '—',
      ].join('\n'),
    });
    return { ok: true };
  } catch (e) {
    console.error('[booking] send failed', e);
    return { ok: false, error: 'Something went wrong sending your message. Please email mythmakerburn@gmail.com directly.' };
  }
}

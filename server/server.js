import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Automatically load from server/.env, root .env, or server/.env.example
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
dotenv.config({ path: path.resolve(__dirname, '.env.example') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio API is running smoothly' });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields: name, email, and message.'
    });
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.'
    });
  }

  try {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('⚠️ EMAIL_USER or EMAIL_PASS not set in .env. Logging message locally:');
      console.log({
        from: `${name} <${email}>`,
        message,
        receivedAt: new Date().toISOString()
      });

      return res.status(200).json({
        success: true,
        message: 'Message received! (Configure EMAIL_USER and EMAIL_PASS in server/.env to forward via email)'
      });
    }

    // Configure Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const recipientEmail = process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER;

    // Email content with clean HTML formatting
    const mailOptions = {
      from: `"${name} (Portfolio)" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      replyTo: email, // Direct reply to client's email
      subject: `New Client Message from ${name} - Portfolio Contact`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nReceived: ${new Date().toLocaleString()}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
          <div style="border-bottom: 2px solid #111215; padding-bottom: 15px; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #111215; font-size: 20px; font-weight: 700;">📬 New Message from Portfolio</h2>
            <p style="margin: 5px 0 0; color: #6b7280; font-size: 13px;">Received on ${new Date().toLocaleString()}</p>
          </div>

          <div style="margin-bottom: 20px;">
            <p style="margin: 0 0 8px; font-size: 14px; color: #6b7280; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Client Details</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #374151; font-weight: 600; width: 80px;">Name:</td>
                <td style="padding: 8px 0; color: #111827;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #374151; font-weight: 600;">Email:</td>
                <td style="padding: 8px 0; color: #2563eb;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom: 25px;">
            <p style="margin: 0 0 8px; font-size: 14px; color: #6b7280; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Message</p>
            <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; border-left: 4px solid #111215; font-size: 15px; line-height: 1.6; color: #1f2937; white-space: pre-wrap;">${message}</div>
          </div>

          <div style="border-top: 1px solid #e5e7eb; padding-top: 15px; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #9ca3af;">
              Tip: You can directly click <strong>Reply</strong> in your email client to respond to <strong>${email}</strong>.
            </p>
          </div>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully! We will get back to you shortly.'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message via email. Please check server logs or try again later.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio backend server running on http://localhost:${PORT}`);
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    console.log(`✅ Nodemailer connected with: ${process.env.EMAIL_USER}`);
  } else {
    console.warn('⚠️ EMAIL_USER or EMAIL_PASS not set in .env');
  }
});

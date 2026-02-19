import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        account: './sign-up.html',
        contact: './contact.html',
        about: './about-us.html',
        deposit: './deposit.html',
        dashboard: './dashboard.html',
        password: './forgot-password.html',
        profile: './profile.html',
        withdraw: './withdraw.html',
        support: './support.html',
        personal: './personal.html',
        business: './business.html',
        transfer: './transfer.html',
        statement: './statement.html',
        profile2: './profile-2.html',
        login: './login.html',
        otp: './otp.html',
        action: './action.html',
        pin: './pin.html',
        ach: './ach.html',
        security: './security.html',
        testimonials: './testimonials.html',
        admin: './admin.html',
        adminLogin: './admin-login.html',
        loan: './loan.html',
        terms: './terms.html',
        privacy: './privacy.html',
        policy: './policy.html',
        debitCard: './debit-card.html',
        onboarding: './onboarding.html',
      },
    },
  },
  // Copy static files to dist/ (Vite only copies referenced assets)
  plugins: [
    {
      name: 'inline-fragments',
      transformIndexHtml(html) {
        try {
          const headerPath = resolve(__dirname, 'components', 'site-header.html');
          const footerPath = resolve(__dirname, 'components', 'site-footer.html');
          const cookieConsentPath = resolve(__dirname, 'components', 'cookie-consent.html');

          const headerHtml = fs.existsSync(headerPath) ? fs.readFileSync(headerPath, 'utf-8') : '';
          const footerHtml = fs.existsSync(footerPath) ? fs.readFileSync(footerPath, 'utf-8') : '';
          const cookieConsentHtml = fs.existsSync(cookieConsentPath) ? fs.readFileSync(cookieConsentPath, 'utf-8') : '';

          // Inline header/footer/cookie-consent where requested. Keep it simple and exact-match the include divs we use.
          if (headerHtml) {
            html = html.replace(
              '<div data-include="components/site-header.html"></div>',
              headerHtml
            );
          }
          if (footerHtml) {
            html = html.replace(
              '<div data-include="components/site-footer.html"></div>',
              footerHtml
            );
          }
          if (cookieConsentHtml) {
            html = html.replace(
              '<div data-include="components/cookie-consent.html"></div>',
              cookieConsentHtml
            );
          }

          return html;
        } catch {
          return html;
        }
      },
    },
    {
      name: 'copy-files',
      writeBundle() {
        const distDir = resolve(__dirname, 'dist');

        // Ensure dist exists
        if (!fs.existsSync(distDir)) {
          fs.mkdirSync(distDir, { recursive: true });
        }

        // Copy manifest.json
        if (fs.existsSync(resolve(__dirname, 'manifest.json'))) {
          fs.copyFileSync(resolve(__dirname, 'manifest.json'), resolve(distDir, 'manifest.json'));
        }
        // Copy favicon (referenced by HTML + manifest.json)
        if (fs.existsSync(resolve(__dirname, 'favicon.png'))) {
          fs.copyFileSync(resolve(__dirname, 'favicon.png'), resolve(distDir, 'favicon.png'));
        }

        // Copy tailwind config/runtime script
        if (fs.existsSync(resolve(__dirname, 'tailwind-mono.js'))) {
          fs.copyFileSync(resolve(__dirname, 'tailwind-mono.js'), resolve(distDir, 'tailwind-mono.js'));
        }

        // Copy logo assets used in header/footer
        if (fs.existsSync(resolve(__dirname, '1.png'))) {
          fs.copyFileSync(resolve(__dirname, '1.png'), resolve(distDir, '1.png'));
        }
        if (fs.existsSync(resolve(__dirname, '2.png'))) {
          fs.copyFileSync(resolve(__dirname, '2.png'), resolve(distDir, '2.png'));
        }
        if (fs.existsSync(resolve(__dirname, '11.png'))) {
          fs.copyFileSync(resolve(__dirname, '11.png'), resolve(distDir, '11.png'));
        }
        if (fs.existsSync(resolve(__dirname, 'header.png'))) {
          fs.copyFileSync(resolve(__dirname, 'header.png'), resolve(distDir, 'header.png'));
        }
        if (fs.existsSync(resolve(__dirname, 'footer.png'))) {
          fs.copyFileSync(resolve(__dirname, 'footer.png'), resolve(distDir, 'footer.png'));
        }

        // Copy standalone JS files that aren't bundled
        if (fs.existsSync(resolve(__dirname, 'live-chat-widget.js'))) {
          fs.copyFileSync(resolve(__dirname, 'live-chat-widget.js'), resolve(distDir, 'live-chat-widget.js'));
        }
        if (fs.existsSync(resolve(__dirname, 'bottom-navbar.js'))) {
          fs.copyFileSync(resolve(__dirname, 'bottom-navbar.js'), resolve(distDir, 'bottom-navbar.js'));
        }
        if (fs.existsSync(resolve(__dirname, 'inactivity-timeout.js'))) {
          fs.copyFileSync(resolve(__dirname, 'inactivity-timeout.js'), resolve(distDir, 'inactivity-timeout.js'));
        }

        // Copy header/footer/components used via data-include
        const componentsSrc = resolve(__dirname, 'components');
        const componentsDest = resolve(distDir, 'components');
        if (fs.existsSync(componentsSrc)) {
          // Node 16+ supports fs.cpSync
          fs.cpSync(componentsSrc, componentsDest, { recursive: true });
        }

        // Copy SEO files
        if (fs.existsSync(resolve(__dirname, 'robots.txt'))) {
          fs.copyFileSync(resolve(__dirname, 'robots.txt'), resolve(distDir, 'robots.txt'));
        }
        if (fs.existsSync(resolve(__dirname, 'sitemap.xml'))) {
          fs.copyFileSync(resolve(__dirname, 'sitemap.xml'), resolve(distDir, 'sitemap.xml'));
        }
      },
    },
  ],
});
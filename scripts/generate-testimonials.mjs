/**
 * Build-time generator for /testimonials (static HTML + JSON-LD)
 *
 * - Reads published testimonials from Firestore (admin SDK)
 * - Writes ./testimonials.html so it is fully crawlable and visible in "View Source"
 * - If credentials are not available, writes a safe empty-state page (no fake reviews)
 */
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_FILE = path.join(ROOT, 'testimonials.html');

function escapeHtml(s) {
  return String(s ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function toPlainDate(createdAt) {
  try {
    if (!createdAt) return null;
    // Firestore Timestamp from admin SDK has toDate()
    if (typeof createdAt.toDate === 'function') {
      return createdAt.toDate().toISOString().split('T')[0];
    }
    // If it's already a Date
    if (createdAt instanceof Date) return createdAt.toISOString().split('T')[0];
    return null;
  } catch {
    return null;
  }
}

function renderPage({ reviews, schemaJson }) {
  const reviewsHtml =
    reviews.length === 0
      ? `
        <div class="mt-6 rounded-xl border border-gray-200 bg-white p-6">
          <p class="text-gray-700">
            Testimonials are currently unavailable.
          </p>
        </div>
      `
      : reviews
          .map((r) => {
            const rating = Number(r.rating) || 0;
            const stars = '⭐'.repeat(Math.max(0, Math.min(5, Math.round(rating))));
            const verified = r.verified ? `<span class="ml-2 inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">Verified</span>` : '';
            const country = r.country ? `<div class="text-xs text-gray-500 mt-1">${escapeHtml(r.country)}</div>` : '';
            return `
              <article class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <div class="text-sm font-bold text-gray-900">
                      ${escapeHtml(r.authorName)}${verified}
                    </div>
                    <div class="text-sm text-gray-700">${escapeHtml(r.company || '')}</div>
                    ${country}
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-semibold text-gray-900">${stars} <span class="text-gray-600">${rating}/5</span></div>
                    ${r.datePublished ? `<div class="text-xs text-gray-500 mt-1">${escapeHtml(r.datePublished)}</div>` : ''}
                  </div>
                </div>
                <p class="mt-4 text-sm leading-relaxed text-gray-800">${escapeHtml(r.reviewText)}</p>
              </article>
            `;
          })
          .join('\n');

  const schemaTag =
    schemaJson
      ? `<script type="application/ld+json">${schemaJson}</script>`
      : '';

  return `<!DOCTYPE html>
<html lang="en" itemscope itemtype="https://schema.org/Blog">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Client Testimonials & Reviews | Twenty Third & Forth - Verified Customer Experiences</title>
    <meta name="description" content="Read verified client testimonials and reviews for Twenty Third & Forth. Real customer experiences from businesses worldwide praising our offshore banking services, compliance expertise, and professional operations." />
    <meta name="keywords" content="Twenty Third & Forth testimonials, offshore banking reviews, client testimonials, verified reviews, customer experiences, offshore banking services, international banking reviews" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="https://twentythirdforth.com/testimonials" />
    <link rel="manifest" href="manifest.json">
    <link rel="apple-touch-icon" sizes="180x180" href="app-icon.svg">
    <link rel="icon" href="app-icon.svg" type="image/png">
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://twentythirdforth.com/testimonials" />
    <meta property="og:title" content="Client Testimonials & Reviews | Twenty Third & Forth" />
    <meta property="og:description" content="Read verified client testimonials and reviews for Twenty Third & Forth. Real customer experiences from businesses worldwide." />
    <meta property="og:image" content="https://twentythirdforth.com/11.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Client Testimonials & Reviews | Twenty Third & Forth" />
    <meta name="twitter:description" content="Read verified client testimonials and reviews for Twenty Third & Forth." />
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
    <script type="application/ld+json" id="testimonials-schema">
      ${schemaTag ? schemaJson : JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Twenty Third & Forth",
        "url": "https://twentythirdforth.com"
      })}
    </script>
  </head>
  <body class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <a href="/" class="flex items-center space-x-3">
              <img src="11.png" alt="Twenty Third & Forth" class="h-10 w-auto">
              <span class="text-xl font-bold text-gray-900" style="font-family: 'Playfair Display', serif;">Twenty Third & Forth</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header class="mb-12 text-center">
        <div class="flex items-center justify-center mb-6">
          <img src="11.png" alt="Twenty Third & Forth" class="h-20 w-auto mr-4">
          <div class="text-left">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-2" style="font-family: 'Playfair Display', serif;">Twenty Third & Forth</h1>
            <p class="text-lg text-purple-600 font-semibold">Client Testimonials & Reviews</p>
          </div>
        </div>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">Verified customer experiences from businesses worldwide.</p>
      </header>
      <section id="testimonials-container" class="space-y-6">
        ${reviewsHtml}
      </section>
    </main>

    <script type="module">
      import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
      import { getFirestore, collection, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

      const firebaseConfig = {
        apiKey: "AIzaSyA7Nw-PhSrJVrO5nl2M9Elin0OZnLLXOwM",
        authDomain: "forth-citizen.firebaseapp.com",
        projectId: "forth-citizen",
        storageBucket: "forth-citizen.firebasestorage.app",
        messagingSenderId: "1058388832999",
        appId: "1:1058388832999:web:d685aa9aed4fae8ba6a842",
        measurementId: "G-XMRK5XK70J"
      };

      try {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        async function loadTestimonials() {
          try {
            console.log('🔍 Loading testimonials...');
            
            // Query only published testimonials
            const q = query(collection(db, 'testimonials'), where('published', '==', true));
            const querySnapshot = await getDocs(q);

            console.log('📊 Found testimonials:', querySnapshot.size);

            const reviews = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              reviews.push({
                id: doc.id,
                authorName: data.authorName || '',
                company: data.company || '',
                country: data.country || '',
                rating: data.rating || 0,
                reviewText: data.reviewText || '',
                verified: data.verified || false,
                authorImage: data.authorImage || '',
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : (data.createdAt ? new Date(data.createdAt) : new Date())
              });
            });

            const container = document.getElementById('testimonials-container');
            
            if (reviews.length === 0) {
              container.innerHTML = \`
                <div class="mt-6 rounded-xl border border-gray-200 bg-white p-6">
                  <p class="text-gray-700 text-center">No testimonials available yet. Please check back later.</p>
                </div>
              \`;
              return;
            }

            // Sort by createdAt (newest first)
            reviews.sort((a, b) => {
              const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
              const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
              return dateB - dateA;
            });

            const avgRating = reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length;

            // Update JSON-LD schema
            const schema = {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Twenty Third & Forth",
              "url": "https://twentythirdforth.com",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": avgRating.toFixed(1),
                "reviewCount": reviews.length.toString(),
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": reviews.map(r => ({
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": r.authorName
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": r.rating.toString(),
                  "bestRating": "5",
                  "worstRating": "1"
                },
                "reviewBody": r.reviewText,
                "datePublished": r.createdAt.toISOString().split('T')[0]
              }))
            };

            const schemaEl = document.getElementById('testimonials-schema');
            if (schemaEl) {
              schemaEl.textContent = JSON.stringify(schema);
            }

            // Render testimonials
            container.innerHTML = reviews.map(r => {
              const stars = '⭐'.repeat(r.rating || 0);
              const date = r.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
              
              return \`
                <article class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div class="flex justify-between items-start mb-3">
                    <div class="flex items-start gap-4">
                      \${r.authorImage ? \`
                        <img src="\${r.authorImage}" alt="\${r.authorName}" 
                             class="w-16 h-16 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                             onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border-2 border-gray-200 hidden">
                          <i class="fas fa-user text-blue-600 text-xl"></i>
                        </div>
                      \` : \`
                        <div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border-2 border-gray-200">
                          <i class="fas fa-user text-blue-600 text-xl"></i>
                        </div>
                      \`}
                      <div>
                        <h3 class="font-semibold text-lg text-gray-900">\${r.authorName || 'Anonymous'}</h3>
                        <p class="text-sm text-gray-600">\${r.company || ''}\${r.company && r.country ? ' • ' : ''}\${r.country || ''}</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="text-yellow-500 text-lg">\${stars}</div>
                      <div class="text-xs text-gray-500 mt-1">\${date}</div>
                    </div>
                  </div>
                  <p class="text-gray-700 leading-relaxed">\${r.reviewText || ''}</p>
                  \${r.verified ? '<div class="mt-3"><span class="inline-flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"><i class="fas fa-check-circle mr-1"></i>Verified</span></div>' : ''}
                </article>
              \`;
            }).join('');

            console.log('✅ Testimonials loaded successfully');
          } catch (error) {
            console.error('❌ Error loading testimonials:', error);
            const container = document.getElementById('testimonials-container');
            container.innerHTML = \`
              <div class="mt-6 rounded-xl border border-red-200 bg-red-50 p-6">
                <p class="text-red-700 text-center">
                  <i class="fas fa-exclamation-triangle mr-2"></i>
                  Error loading testimonials: \${error.message}
                </p>
              </div>
            \`;
          }
        }

        loadTestimonials();
      } catch (error) {
        console.error('❌ Firebase initialization error:', error);
        const container = document.getElementById('testimonials-container');
        container.innerHTML = \`
          <div class="mt-6 rounded-xl border border-red-200 bg-red-50 p-6">
            <p class="text-red-700 text-center">
              <i class="fas fa-exclamation-triangle mr-2"></i>
              Failed to initialize Firebase: \${error.message}
            </p>
          </div>
        \`;
      }
    </script>
  </body>
</html>`;
}

async function main() {
  let reviews = [];
  let schemaJson = null;

  try {
    const admin = await import('firebase-admin');

    // Initialize admin app safely (supports multiple invocations)
    if (!admin.apps?.length) {
      // Option A: JSON in env var
      if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        const svc = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        admin.initializeApp({
          credential: admin.credential.cert(svc),
        });
      } else {
        // Option B: GOOGLE_APPLICATION_CREDENTIALS or ADC
        admin.initializeApp({
          credential: admin.credential.applicationDefault?.() || undefined,
        });
      }
    }

    const { getFirestore } = await import('firebase-admin/firestore');
    const db = getFirestore();

    const snap = await db
      .collection('testimonials')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(20)
      .get();

    reviews = snap.docs.map((d) => {
      const data = d.data() || {};
      const datePublished = toPlainDate(data.createdAt);
      return {
        id: d.id,
        authorName: data.authorName ?? '',
        company: data.company ?? '',
        rating: Number(data.rating ?? 0),
        reviewText: data.reviewText ?? '',
        country: data.country ?? '',
        verified: Boolean(data.verified),
        createdAt: data.createdAt ?? null,
        datePublished,
      };
    });

    // Schema must match visible content exactly
    if (reviews.length > 0) {
      const avgRating = reviews.reduce((a, b) => a + (Number(b.rating) || 0), 0) / reviews.length;
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Twenty Third & Forth',
        url: 'https://twentythirdforth.com',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: avgRating.toFixed(1),
          reviewCount: String(reviews.length),
        },
        review: reviews.map((r) => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: r.authorName },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: String(r.rating),
            bestRating: '5',
          },
          reviewBody: r.reviewText,
          ...(r.datePublished ? { datePublished: r.datePublished } : {}),
        })),
      };

      schemaJson = JSON.stringify(schema);
    }
  } catch (err) {
    // If admin SDK or credentials are missing, write an empty-state page (no fake reviews).
    console.warn('[testimonials] generation skipped:', err?.message || err);
  }

  const html = renderPage({ reviews, schemaJson });
  fs.writeFileSync(OUT_FILE, html, 'utf8');
  console.log(`[testimonials] wrote ${path.relative(ROOT, OUT_FILE)} (${reviews.length} reviews)`);
}

main().catch((e) => {
  console.error('[testimonials] failed:', e);
  // Still write a safe page so builds don’t fail.
  const html = renderPage({ reviews: [], schemaJson: null });
  fs.writeFileSync(OUT_FILE, html, 'utf8');
  process.exit(0);
});



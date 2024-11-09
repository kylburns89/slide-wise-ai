import { Presentation } from './types';
import { jsPDF } from 'jspdf';
import pptxgen from 'pptxgenjs';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { themes } from './themes';

export async function exportPresentation(presentation: Presentation, format: string) {
  switch (format) {
    case 'pdf':
      return exportToPDF(presentation);
    case 'pptx':
      return exportToPowerPoint(presentation);
    case 'html':
      return exportToHTML(presentation);
    case 'offline':
      return exportOfflinePackage(presentation);
    default:
      throw new Error('Unsupported export format');
  }
}

async function exportToPDF(presentation: Presentation) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  presentation.slides.forEach((slide, index) => {
    if (index > 0) doc.addPage();
    
    // Add title
    doc.setFontSize(24);
    doc.text(slide.content.split('\n')[0], 20, 20);
    
    // Add content
    doc.setFontSize(14);
    const content = slide.content.split('\n').slice(1).join('\n');
    doc.text(content, 20, 40);
  });

  doc.save(`${presentation.title}.pdf`);
}

async function exportToPowerPoint(presentation: Presentation) {
  const pptx = new pptxgen();
  const theme = themes.find(t => t.id === presentation.theme);

  presentation.slides.forEach((slide) => {
    const pptxSlide = pptx.addSlide();
    
    // Apply theme
    if (theme) {
      pptxSlide.background = { color: theme.styles.background };
    }

    // Add content
    const lines = slide.content.split('\n');
    pptxSlide.addText(lines[0], {
      x: 0.5,
      y: 0.5,
      w: '90%',
      fontSize: 24,
      bold: true,
    });

    pptxSlide.addText(lines.slice(1).join('\n'), {
      x: 0.5,
      y: 1.5,
      w: '90%',
      fontSize: 14,
    });
  });

  await pptx.writeFile(`${presentation.title}.pptx`);
}

async function exportToHTML(presentation: Presentation) {
  const theme = themes.find(t => t.id === presentation.theme);
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${presentation.title}</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js/dist/reveal.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js/dist/theme/black.css">
        <style>
          ${theme ? `
            :root {
              --r-background-color: ${theme.styles.background};
              --r-main-color: ${theme.styles.text};
              --r-heading-color: ${theme.styles.heading};
            }
          ` : ''}
        </style>
      </head>
      <body>
        <div class="reveal">
          <div class="slides">
            ${presentation.slides.map(slide => `
              <section>
                ${slide.content}
              </section>
            `).join('')}
          </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/reveal.js/dist/reveal.js"></script>
        <script>
          Reveal.initialize();
        </script>
      </body>
    </html>
  `;

  const blob = new Blob([html], { type: 'text/html' });
  saveAs(blob, `${presentation.title}.html`);
}

async function exportOfflinePackage(presentation: Presentation) {
  const zip = new JSZip();
  const theme = themes.find(t => t.id === presentation.theme);

  // Add HTML file
  zip.file('index.html', `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${presentation.title}</title>
        <link rel="stylesheet" href="css/reveal.css">
        <link rel="stylesheet" href="css/theme.css">
      </head>
      <body>
        <div class="reveal">
          <div class="slides">
            ${presentation.slides.map(slide => `
              <section>
                ${slide.content}
              </section>
            `).join('')}
          </div>
        </div>
        <script src="js/reveal.js"></script>
        <script>
          Reveal.initialize();
        </script>
      </body>
    </html>
  `);

  // Add required files
  const revealJS = await fetch('https://cdn.jsdelivr.net/npm/reveal.js/dist/reveal.js').then(r => r.text());
  const revealCSS = await fetch('https://cdn.jsdelivr.net/npm/reveal.js/dist/reveal.css').then(r => r.text());
  
  zip.file('js/reveal.js', revealJS);
  zip.file('css/reveal.css', revealCSS);
  zip.file('css/theme.css', `
    :root {
      --r-background-color: ${theme?.styles.background || '#191919'};
      --r-main-color: ${theme?.styles.text || '#fff'};
      --r-heading-color: ${theme?.styles.heading || '#fff'};
    }
  `);

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `${presentation.title}-offline.zip`);
}
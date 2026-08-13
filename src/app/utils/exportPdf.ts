import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

export const exportElementToPdf = async (
  elementId: string,
  filename = 'document.pdf',
) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found!`);
    return;
  }

  // Запоминаем стили
  const originalBg = element.style.backgroundColor;
  element.style.backgroundColor = '#111827'; // Тёмный фон под стиль приложения

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#111827',
      logging: false,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = pdfHeight;
    let position = 0;

    // Первая страница
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;

    // Последующие страницы
    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Error creating PDF:', error);
  } finally {
    element.style.backgroundColor = originalBg;
  }
};
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateTicketPDF = async (booking, flight, user) => {

  // Load Unicode font
  const fontPath = path.join(__dirname, "..", "fonts", "NotoSans-Regular.ttf");
  const fontBytes = fs.readFileSync(fontPath);

  const pdfDoc = await PDFDocument.create();

  // ⭐ REQUIRED STEP
  pdfDoc.registerFontkit(fontkit);

  // Embed custom font
  const customFont = await pdfDoc.embedFont(fontBytes);

  const page = pdfDoc.addPage([600, 360]);
  const { width, height } = page.getSize();

  // Header
  page.drawRectangle({
    x: 0,
    y: height - 60,
    width,
    height: 60,
    color: rgb(0.22, 0.17, 0.58),
  });

  page.drawText("FLYHIGH - Flight Ticket", {
    x: 20,
    y: height - 42,
    size: 20,
    font: customFont,
    color: rgb(1, 1, 1),
  });

  // Flight info
  page.drawText(`Airline: ${flight.airline}`, { x: 20, y: height - 90, size: 12, font: customFont });
  page.drawText(`Flight No: ${flight.flightNumber}`, { x: 20, y: height - 110, size: 11, font: customFont });
  page.drawText(`From: ${flight.departureAirport.city} (${flight.departureAirport.airportCode})`, { x: 20, y: height - 135, size: 11, font: customFont });
  page.drawText(`To: ${flight.arrivalAirport.city} (${flight.arrivalAirport.airportCode})`, { x: 20, y: height - 155, size: 11, font: customFont });
  page.drawText(`Departure: ${new Date(flight.departureTime).toLocaleString()}`, { x: 20, y: height - 180, size: 11, font: customFont });
  page.drawText(`Arrival: ${new Date(flight.arrivalTime).toLocaleString()}`, { x: 20, y: height - 200, size: 11, font: customFont });

  // Booking info
  page.drawText(`Booking ID: ${booking._id}`, { x: 330, y: height - 90, size: 10, font: customFont });
  page.drawText(`Booked by: ${user.email || user.name || "User"}`, { x: 330, y: height - 110, size: 10, font: customFont });
  page.drawText(`Seat Class: ${booking.seatClass}`, { x: 330, y: height - 135, size: 11, font: customFont });

  // ₹ symbol now works
  page.drawText(`Total Paid: ₹${booking.totalPrice}`, {
    x: 330,
    y: height - 155,
    size: 11,
    font: customFont,
  });

  // Passengers
  page.drawText("Passengers:", { x: 20, y: height - 230, size: 12, font: customFont });

  booking.passengers.forEach((p, i) => {
    const y = height - 250 - i * 16;
    page.drawText(`${i + 1}. ${p.name} (${p.age}) - Seat: ${p.seat || "N/A"}`, {
      x: 28,
      y,
      size: 10,
      font: customFont,
    });
  });

  // Footer
  page.drawText(
    "This is a system generated ticket. Carry ID at boarding.",
    { x: 20, y: 20, size: 9, font: customFont, color: rgb(0.2, 0.2, 0.6) }
  );

  return await pdfDoc.save();
};

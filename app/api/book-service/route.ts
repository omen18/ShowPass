import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const { service_type, summary, passengers } = body as {
    service_type: string;
    summary: string;
    passengers?: number;
  };

  if (!service_type || !summary) {
    return NextResponse.json({ error: "service_type and summary required" }, { status: 400 });
  }

  const prefix = service_type.slice(0, 2).toUpperCase();
  const bookingId = `${prefix}-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  const qrPayload = JSON.stringify({
    id: bookingId,
    type: service_type,
    summary,
    pax: passengers ?? 1,
    issued: new Date().toISOString(),
  });

  return NextResponse.json({
    data: {
      booking_id: bookingId,
      qr_code: qrPayload,
      status: "CONFIRMED",
      service_type,
      summary,
    },
  });
}

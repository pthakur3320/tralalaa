export async function sendNotification(data: any) {
  await fetch(process.env.NEXT_PUBLIC_NOTIFY_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

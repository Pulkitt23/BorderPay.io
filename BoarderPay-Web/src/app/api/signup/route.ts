export async function POST(request: Request) {
  const { employeeType } = await request.json();
  return Response.json({ success: true });
}

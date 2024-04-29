export async function POST(request: Request) {
  const { employer_id, employee_id } = await request.json();
  // Toggle the status of user in hyperledger
  return Response.json({ success: true });
}

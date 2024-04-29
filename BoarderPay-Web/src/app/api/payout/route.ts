export async function POST(request: Request) {
  const { employee, employer, amount } = await request.json();
  // Pay the employee using hyperledger
  return Response.json({ success: true });
}

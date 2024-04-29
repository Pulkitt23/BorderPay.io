export async function POST(request: Request) {
  const contract = await request.json();
  // Put this contract to hyperledger
  return Response.json({ successs: true });
}

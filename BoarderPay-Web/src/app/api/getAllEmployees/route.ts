const employees = [
    {
      email: "pulkit@gmail.com",
      password: "rvjk3ui389gjkd",
      role: "employee",
      corrency: "dollar"
    },
    {
      email: "ram@gmail.com",
      password: "52kltgklwrkj",
      role: "employee",
      corrency: "rupees"
    },
    {
      email: "mohan@gmail.com",
      password: "cxjuj8jrfuh",
      role: "employee",
      corrency: "dollar"
    },
    {
      email: "shivam@gmail.com",
      password: "uwutjg54gjk",
      role: "employee",
      corrency: "dollar"
    }  
  ]
  
  export async function GET() {
    return Response.json(JSON.stringify({"data": employees}))
  }
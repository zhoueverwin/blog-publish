const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: "us17", // e.g., us1
});

export async function POST(request) {
  // Get data submitted in request's form.
  const form = await request.formData();
  const formData = Object.fromEntries(form.entries());

  // Log the form data to the console and confirm what is the format of the data from singup form.
  console.log('Form data:', formData);

  // Guard clause checks for email and returns early if it is not found.
  if (!formData.email) {
    // Sends a HTTP bad request error code.
    return new Response(JSON.stringify({ error: "Email not found" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }


  // Create the data for the Mailchimp API request
  const data = {
    email_address: formData.email, // The email address submitted in the form
    status: 'subscribed', // 'subscribed' to add the email to your mailing list
    merge_fields: {
      "FNAME": formData.firstName, 
      "LNAME": formData.lastName
    }
  };

  try {
    // Send a POST request to the Mailchimp API
    const response = await client.lists.addListMember(process.env.MAILCHIMP_LIST_ID, data);
    console.log('Mailchimp response:', response);

    // Redirect to the homepage
    return new Response(null, {
      status: 302,
      headers: { Location: "/" },
    });
  }  catch (error) {
    // Handle the error
    console.error('Mailchimp error:', error.response ? error.response.body : error.message);
  
    let errorMessage = "An error occurred";
    if (error.response && error.response.body && error.response.body.title === "Member Exists") {
      errorMessage = "This email is already subscribed";
    }
  
    return new Response(JSON.stringify({ error: errorMessage, details: error.response ? error.response.body : error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

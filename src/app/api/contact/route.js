

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


export async function POST(request) {
  // Get data submitted in request's form.
  const form = await request.formData();
  const formData = Object.fromEntries(form.entries());
  // console.log(supabase)

  // Optional logging to see the responses in the command line where the
  // Next.js app is running.

  // Add a timestamp
// Add a timestamp
// const timestampTz = new Date().toISOString();


  // console.log(formData);
const date = new Date();
const options = { timeZone: 'Asia/Tokyo', timeZoneName: 'short' };
const timestampTz = date.toLocaleString('en-US', options);

  // console.log(formData);

  // Guard clause checks for email and returns early if it is not found.
  if (!formData.name || !formData.email || !formData.message) {
    // Sends a HTTP bad request error code.
    return new Response(
      "One or more of the following not found: name, email, message",
      {
        status: 400,
      },
    );
  }
  // Here, you could send the message to a service like Supabase to read later.
  //
  // This is just an example, so we won't do anything except redirect back to
  // the homepage.
// send the message to Supabase.
// Here, you send the message to Supabase.

  const {data, error } = await supabase
  .from('contact_form')
  .insert([
    {
      user_name: formData.name,
      user_email: formData.email,
      message: formData.message,
      time: timestampTz,
      gender: formData.gender,
      age: formData.age,
     },
  ])
  console.log('Data:', data)
  console.log('Error:', error)

  if (data){
    console.log(data)

  }


  return new Response("Homepage redirect", {
    status: 302,//It is commonly used to perform URL redirection.
    headers: { Location: "/contact-me" }, // Redirect to contact-me page, if I remove contact-me it will redirect to the homepage
  });
}

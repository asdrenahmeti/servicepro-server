const en = {
  user: {
    name: "Name is required!",
    username: "Username is required!",
    email_empty: "Email is required!",
    email_format: "Incorrect email format",
    pass_empty: "Password is required!",
    pass_length: "Password must contain at least 6 characters!",
    phone: "Phone is required!",
    city: "City is required!",
    zip_code: "Zip_code is required!",
    country: "Country is required!",
    img_url: "Image is required!",
    role: "Role is required!",
    wrong_role: "This user role is not allowed!",
    zip_code: "Zip_code is required!",
    adress: "Adress is required!",
  },
  user_service: {
    userId: "UserId is required!",
    serviceId: "ServiceId is required!",
  },
  service: {
    name: "Name is required!",
  },
  subscribe: {
    from: "Start date is required!",
    to: "End date is required!",
    date_format: "Date format is not valid!",
    userId: "User is required",
    userId_exist: "This user does not exist!",
  },
  rating: {
    masterId: "MasterId is required!",
    guestId: "GuestId is required!",
    rating_value: "Rating values required!",
    rating_value_data: "Rating value must be between 1 to 5",
    rating_quote: "Rating message is required!",
    rating_quote_length:
      "The text must have a minimum of 20 letters and a maximum of 200",
  },
  job: {
    title: "Title is required!",
    description: "Description is required!",
    userId: "UserId is required!",
    price: "Price is required!",
  },
  job_request: {
    title: "Title is required!",
    description: "Description is required!",
    userId: "UserId is required!",
  },
  job_image: {
    img_url: "Images url is required!",
    jobId: "JobId is required!",
  },
  comment: {
    masterId: "MasterId is required!",
    guestId: "GuestId is required!",
    comment_text: "Comment is required!",
  },
};
const messages = {
  en,
};
module.exports = messages;

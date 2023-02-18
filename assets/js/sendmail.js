Email.send({
    SecureToken : "d2b8e750-6234-4ee4-bf52-9a07d483114d",
    To : 'frogtech.company@gmail.com',
    From : "dangtt135@gmail.com",
    Subject : "This is the subject",
    Body : "And this is the body"
}).then(
  message => alert(message)
);

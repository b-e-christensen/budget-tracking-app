const context = {
  greeting: 'Hello! Welcome to your new budget app.',
  user: '',
  newUser: 'New User!!',
  time: 'The time is: '
};

const templateElement = document.getElementById("templateHB");

const templateSource = templateElement.innerHTML;

const template = Handlebars.compile(templateSource);

const compiledHtml = template(context);

document.getElementById('greeting').innerHTML = compiledHtml;


const dateTime = document.getElementsByClassName("time")
dateTime.textContent = new Date().toLocaleDateString("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "numeric"
});

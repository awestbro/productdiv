export const Alert = {
  name: "Alert",
  htmlTemplate: `
          <div class="alert alert-primary" role="alert">
              A simple primary alert—check it out!
          </div>
          `,
  tags: ["Component"],
};
export const AlertWithLink = {
  name: "Alert with link",
  htmlTemplate: `
          <div class="alert alert-primary" role="alert">
              A simple primary alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
          </div>
          `,
  tags: ["Component"],
};
export const AlertWithBody = {
  name: "Alert with body",
  htmlTemplate: `
          <div class="alert alert-success" role="alert">
              <h4 class="alert-heading">Well done!</h4>
              <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
              <hr>
              <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
          </div>
          `,
  tags: ["Component"],
};
export const AlertDismissable = {
  name: "Alert dismissable (requires JS)",
  htmlTemplate: `
          <div class="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>Holy guacamole!</strong> You should check in on some of those fields below.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
          `,
  tags: ["Component"],
};
export const Badge = {
  name: "Badge",
  htmlTemplate: `
          <span class="badge bg-secondary">New</span>
          `,
  tags: ["Component"],
};
export const PillBadge = {
  name: "Pill Badge",
  htmlTemplate: `
          <span class="badge rounded-pill bg-primary">Primary</span>
          `,
  tags: ["Component"],
};
export const NotificationBadge = {
  name: "Notification Badge",
  htmlTemplate: `
          <button type="button" class="btn btn-primary">
              Notifications <span class="badge bg-secondary">4</span>
          </button>
          `,
  tags: ["Component"],
};
export const BreadcrumbNav = {
  name: "Breadcrumb Nav",
  htmlTemplate: `
          <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="#">Home</a></li>
                  <li class="breadcrumb-item"><a href="#">Library</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Data</li>
              </ol>
          </nav>
          `,
  tags: ["Component"],
};
export const BreadcrumbItem = {
  name: "Breadcrumb Item",
  htmlTemplate: `
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          `,
  tags: ["Component"],
};
export const CardWithImage = {
  name: "Card with Image",
  htmlTemplate: `
  <div class="card">
      <img src="https://via.placeholder.com/600x150?text=600x150" class="card-img-top" alt="..." height="150px">
      <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
  </div>
          `,
  previewWidth: "500px",
  tags: ["Component"],
};
export const CardBodyOnly = {
  name: "Card Body only",
  htmlTemplate: `
          <div class="card">
              <div class="card-body">
                  This is some text within a card body.
              </div>
          </div>
          `,
  tags: ["Component"],
};
export const CardWithTitleTextLinks = {
  name: "Card with title, text, links",
  htmlTemplate: `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" class="card-link">Card link</a>
                  <a href="#" class="card-link">Another link</a>
              </div>
          </div>
          `,
  tags: ["Component"],
};
export const CardListGroup = {
  name: "Card List Group",
  htmlTemplate: `
          <div class="card">
              <ul class="list-group list-group-flush">
                  <li class="list-group-item">An item</li>
                  <li class="list-group-item">A second item</li>
                  <li class="list-group-item">A third item</li>
              </ul>
          </div>
          `,
  tags: ["Component"],
};
export const CardWithHeader = {
  name: "Card with Header",
  htmlTemplate: `
          <div class="card">
              <div class="card-header">
                  Featured
              </div>
              <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
          </div>
          `,
  tags: ["Component"],
};
export const NavigationCard = {
  name: "Navigation Card",
  htmlTemplate: `
          <div class="card text-center">
              <div class="card-header">
                  <ul class="nav nav-tabs card-header-tabs">
                  <li class="nav-item">
                      <a class="nav-link active" href="#">Active</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="#">Link</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                  </li>
                  </ul>
              </div>
              <div class="card-body">
                  <h5 class="card-title">Special title treatment</h5>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
          </div>
          `,
  tags: ["Component"],
};
export const CardImageOverlay = {
  name: "Card Image Overlay",
  htmlTemplate: `
          <div class="card bg-dark text-white">
              <img src="https://via.placeholder.com/300x200?text=300x200" class="card-img" alt="...">
              <div class="card-img-overlay">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <p class="card-text">Last updated 3 mins ago</p>
              </div>
          </div>
          `,
  tags: ["Component"],
};
export const HorizontalCard = {
  name: "Horizontal Card",
  htmlTemplate: `
  <div class="card mb-3">
      <div class="row g-0">
          <div class="col-md-4">
          <img src="https://via.placeholder.com/300x200?text=300x200" class="img-fluid rounded-start h-100" alt="...">
          </div>
          <div class="col-md-8">
          <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
          </div>
      </div>
  </div>
          `,
  tags: ["Component"],
};
export const Carousel = {
  name: "Carousel (requires JS)",
  htmlTemplate: `
          <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                  <div class="carousel-item active">
                  <img src="https://via.placeholder.com/900x600?text=Slide+1" class="d-block w-100" alt="...">
                  </div>
                  <div class="carousel-item">
                  <img src="https://via.placeholder.com/900x600?text=Slide+2" class="d-block w-100" alt="...">
                  </div>
                  <div class="carousel-item">
                  <img src="https://via.placeholder.com/900x600?text=Slide+3" class="d-block w-100" alt="...">
                  </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
              </button>
          </div>
          `,
  tags: ["Component"],
};
export const CollapseButton = {
  name: "Collapse Button",
  htmlTemplate: `
          <p>
              <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                  Collapse Button
              </button>
              </p>
              <div class="collapse" id="collapseExample">
              <div class="card card-body">
                  Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
              </div>
          </div>
          `,
  tags: ["Component"],
};
export const Accordian = {
  name: "Accordian",
  htmlTemplate: `
          <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      Accordion Item #1
                  </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                      <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                  </div>
                  </div>
              </div>
              <div class="accordion-item">
                  <h2 class="accordion-header" id="headingTwo">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      Accordion Item #2
                  </button>
                  </h2>
                  <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                      <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                  </div>
                  </div>
              </div>
              <div class="accordion-item">
                  <h2 class="accordion-header" id="headingThree">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      Accordion Item #3
                  </button>
                  </h2>
                  <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                      <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                  </div>
                  </div>
              </div>
          </div>
          `,
  tags: ["Component"],
};
export const Dropdown = {
  name: "Dropdown",
  htmlTemplate: `
          <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown button
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
          </div>
          `,
  tags: ["Component"],
};
export const SplitButtonDropdown = {
  name: "Split Button Dropdown",
  htmlTemplate: `
          <div class="btn-group">
              <button type="button" class="btn btn-danger">Action</button>
              <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#">Separated link</a></li>
              </ul>
          </div>
          `,
  tags: ["Component"],
};
export const ListGroup = {
  name: "List Group",
  htmlTemplate: `
          <ul class="list-group">
              <li class="list-group-item">An item</li>
              <li class="list-group-item">A second item</li>
              <li class="list-group-item">A third item</li>
              <li class="list-group-item">A fourth item</li>
              <li class="list-group-item">And a fifth one</li>
          </ul>
          `,
  tags: ["Component"],
};
export const ListGroupContent = {
  name: "List Group Content",
  htmlTemplate: `
          <ol class="list-group list-group-numbered">
              <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                  <div class="fw-bold">Subheading</div>
                  Cras justo odio
                  </div>
                  <span class="badge bg-primary rounded-pill">14</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                  <div class="fw-bold">Subheading</div>
                  Cras justo odio
                  </div>
                  <span class="badge bg-primary rounded-pill">14</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                  <div class="fw-bold">Subheading</div>
                  Cras justo odio
                  </div>
                  <span class="badge bg-primary rounded-pill">14</span>
              </li>
          </ol>
          `,
  tags: ["Component"],
};
export const Modal = {
  name: "Modal (requires JS)",
  htmlTemplate: `
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Launch demo modal
          </button>

          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                  <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                      ...
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Save changes</button>
                  </div>
                  </div>
              </div>
          </div>
          `,
  tags: ["Component"],
};
export const Jumbotron = {
  name: "Jumbotron",
  htmlTemplate: `
          <div class="jumbotron">
              <div class="container">
                  <h1 class="display-3">Hello, world!</h1>
                  <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
                  <p><a class="btn btn-primary btn-lg" href="https://getbootstrap.com/" role="button">Learn more »</a></p>
              </div>
          </div>
          `,
  tags: ["Component"],
};
export const Progress = {
  name: "Progress",
  htmlTemplate: `
          <div class="progress">
              <div class="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          `,
  tags: ["Component"],
};
export const PricingCards = {
  name: "Pricing Cards",
  htmlTemplate: `
          <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
              <div class="col">
                  <div class="card mb-4 rounded-3 shadow-sm">
                      <div class="card-header py-3">
                          <h4 class="my-0 fw-normal">Free</h4>
                      </div>
                      <div class="card-body">
                          <h1 class="card-title pricing-card-title">$0<small class="text-muted fw-light">/mo</small></h1>
                          <ul class="list-unstyled mt-3 mb-4">
                              <li>10 users included</li>
                              <li>2 GB of storage</li>
                              <li>Email support</li>
                              <li>Help center access</li>
                          </ul>
                          <button type="button" class="w-100 btn btn-lg btn-outline-primary">Sign up for free</button>
                      </div>
                  </div>
              </div>
              <div class="col">
                  <div class="card mb-4 rounded-3 shadow-sm">
                      <div class="card-header py-3">
                          <h4 class="my-0 fw-normal">Pro</h4>
                      </div>
                      <div class="card-body">
                          <h1 class="card-title pricing-card-title">$15<small class="text-muted fw-light">/mo</small></h1>
                          <ul class="list-unstyled mt-3 mb-4">
                              <li>20 users included</li>
                              <li>10 GB of storage</li>
                              <li>Priority email support</li>
                              <li>Help center access</li>
                          </ul>
                          <button type="button" class="w-100 btn btn-lg btn-primary">Get started</button>
                      </div>
                  </div>
              </div>
              <div class="col">
                  <div class="card mb-4 rounded-3 shadow-sm border-primary">
                      <div class="card-header py-3 text-white bg-primary border-primary">
                          <h4 class="my-0 fw-normal">Enterprise</h4>
                      </div>
                      <div class="card-body">
                          <h1 class="card-title pricing-card-title">$29 <small class="text-muted fw-light">/ mo</small></h1>
                          <ul class="list-unstyled mt-3 mb-4">
                              <li>30 users included</li>
                              <li>15 GB of storage</li>
                              <li>Phone and email support</li>
                              <li>Help center access</li>
                          </ul>
                          <button type="button" class="w-100 btn btn-lg btn-primary">Contact us</button>
                      </div>
                  </div>
              </div>
          </div>
          `,
  tags: ["Component"],
};

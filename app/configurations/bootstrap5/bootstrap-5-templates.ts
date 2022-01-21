import { TemplateCategoryDefinition } from "../../utilities/configuration/configuration-importer";

export const templateCategories: TemplateCategoryDefinition[] = [
  {
    name: "Content",
    templates: [
      {
        name: "Title",
        htmlTemplate: `
                <h2 class="text-bold">Title</h2>
                `,
      },
      {
        name: "Subtitle",
        htmlTemplate: `
                <h3 class="text-muted">Subtitle</h3>
                `,
      },
      {
        name: "Page Header",
        htmlTemplate: `
                <h2 class="text-bold">Title</h2>
                <h3 class="text-muted">Subtitle</h3>
                <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consectetur commodo consequat.</p>
                `,
      },
      {
        name: "Paragraph",
        htmlTemplate: `
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consectetur commodo consequat. In condimentum fermentum augue, sit amet iaculis ante sagittis non. Fusce fringilla lacus id condimentum hendrerit. Cras posuere mi et tellus cursus mattis. Suspendisse pellentesque iaculis lectus a sagittis. Phasellus egestas orci lorem, eu vulputate nisi tempus sed. Fusce aliquet odio quis efficitur feugiat. Donec in nisl tincidunt erat euismod blandit. In semper, tortor non commodo sagittis, orci diam placerat lacus, at sodales diam metus tempor mauris.</p>
                `,
      },
      {
        name: "Block Quote",
        htmlTemplate: `
                <div class="text-center">
                    <blockquote class="blockquote">
                        <p class="">"A well-known quote, contained in a blockquote element."</p>
                    </blockquote>
                    <p>- Someone famous in <cite title="Source Title" class="fw-bold">Source Title</cite></p>
                </div>
                `,
      },
      {
        name: "Unstyled List",
        htmlTemplate: `
                <ul class="list-unstyled">
                    <li>This is a list.</li>
                    <li>It appears completely unstyled.</li>
                    <li>Structurally, it's still a list.</li>
                    <li>However, this style only applies to immediate child elements.</li>
                    <li>Nested lists:
                        <ul>
                        <li>are unaffected by this style</li>
                        <li>will still show a bullet</li>
                        <li>and have appropriate left margin</li>
                        </ul>
                    </li>
                    <li>This may still come in handy in some situations.</li>
                </ul>
                `,
      },
      {
        name: "Table",
        htmlTemplate: `
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
                `,
      },
      {
        name: "Table Responsive",
        htmlTemplate: `
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                `,
      },
      {
        name: "Inline Code",
        htmlTemplate: `
                <code>Inline</code>
                `,
      },
      {
        name: "Code Block",
        htmlTemplate: `
<pre><code>&lt;p&gt;Sample text here...&lt;/p&gt;
&lt;p&gt;And another line of sample text here...&lt;/p&gt;
</code></pre>
                `,
      },
      {
        name: "Variable",
        htmlTemplate: `
                <var>y</var> = <var>m</var><var>x</var> + <var>b</var>
                `,
      },
      {
        name: "User Input",
        htmlTemplate: `
                <kbd>cd</kbd>
                `,
      },
      {
        name: "Sample output",
        htmlTemplate: `
                <samp>This text is meant to be treated as sample output from a computer program.</samp>
                `,
      },
    ],
  },
  {
    name: "Layout",
    templates: [
      {
        name: "Section Container",
        htmlTemplate: `
                <section class="container">
                    <div class="productdiv-drop-container"></div>
                </section>
                `,
      },
      {
        name: "Row Two Column",
        htmlTemplate: `
                <div class="row">
                    <div class="col-sm-6">
                    <div class="productdiv-drop-container"></div>
                    </div>
                    <div class="col-sm-6">
                    <div class="productdiv-drop-container"></div>
                    </div>
                </div>
                `,
      },
      {
        name: "Row Three Column",
        htmlTemplate: `
                <div class="row">
                    <div class="col-sm-4">
                    <div class="productdiv-drop-container"></div>
                    </div>
                    <div class="col-sm-4">
                    <div class="productdiv-drop-container"></div>
                    </div>
                    <div class="col-sm-4">
                    <div class="productdiv-drop-container"></div>
                    </div>
                </div>
                `,
      },
      {
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
      },
    ],
  },
  {
    name: "Components",
    templates: [
      {
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
      },
    ],
  },
  {
    name: "Form",
    templates: [
      {
        name: "Form Element",
        htmlTemplate: `
                <form class="py-3">
                  <div class="productdiv-drop-container"></div>
                </form>
                `,
      },
      {
        name: "Email Field",
        htmlTemplate: `
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
                </div> 
                `,
      },
      {
        name: "Password Field",
        htmlTemplate: `
                <div class="mb-3">
                    <label for="inputPassword" class="form-label">Password</label>
                    <input type="password" class="form-control" id="inputPassword">
                </div>
                `,
      },
      {
        name: "Textarea",
        htmlTemplate: `
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                `,
      },
      {
        name: "File Select",
        htmlTemplate: `
                <div class="mb-3">
                    <label for="formFile" class="form-label">Default file input example</label>
                    <input class="form-control" type="file" id="formFile">
                </div>
                `,
      },
      {
        name: "Select",
        htmlTemplate: `
                <div class="mb-3">
                    <label for="select" class="form-label">Select</label>
                    <select id="select" class="form-select" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                `,
      },
      {
        name: "Checkbox",
        htmlTemplate: `
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        Default checkbox
                    </label>
                </div>
                `,
      },
      {
        name: "Radio Options",
        htmlTemplate: `
                <div class="mb-3">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
                        <label class="form-check-label" for="exampleRadios1">
                        Default radio
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
                        <label class="form-check-label" for="exampleRadios2">
                        Second default radio
                        </label>
                    </div>
                </div>
                `,
      },
      {
        name: "Login Form",
        htmlTemplate: `
                <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1">
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="rememberMe">
                        <label class="form-check-label" for="rememberMe">Remember Me?</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                `,
      },
    ],
  },
  {
    name: "Images",
    templates: [
      {
        name: "Responsive Image",
        htmlTemplate: `
                <img src="https://via.placeholder.com/468x60?text=Responsive" class="img-fluid" alt="...">
                `,
      },
      {
        name: "Image Thumbnail",
        htmlTemplate: `
                <img src="https://via.placeholder.com/200?text=200" class="img-thumbnail" alt="...">
                `,
      },
      {
        name: "Figure Image with Caption",
        htmlTemplate: `
                <figure class="figure">
                    <img src="https://via.placeholder.com/300x200?text=300x200" class="figure-img img-fluid rounded" alt="...">
                    <figcaption class="figure-caption">A caption for the above image.</figcaption>
                </figure>
                `,
      },
    ],
  },
  {
    name: "Alerts",
    templates: [
      {
        name: "Alert",
        htmlTemplate: `
                <div class="alert alert-primary" role="alert">
                    A simple primary alert—check it out!
                </div>
                `,
      },
      {
        name: "Alert with link",
        htmlTemplate: `
                <div class="alert alert-primary" role="alert">
                    A simple primary alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
                </div>
                `,
      },
      {
        name: "Alert with body",
        htmlTemplate: `
                <div class="alert alert-success" role="alert">
                    <h4 class="alert-heading">Well done!</h4>
                    <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
                    <hr>
                    <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
                </div>
                `,
      },
      {
        name: "Alert dismissable (requires JS)",
        htmlTemplate: `
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Holy guacamole!</strong> You should check in on some of those fields below.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                `,
      },
    ],
  },
  {
    name: "Badges",
    templates: [
      {
        name: "Badge",
        htmlTemplate: `
                <span class="badge bg-secondary">New</span>
                `,
      },
      {
        name: "Pill Badge",
        htmlTemplate: `
                <span class="badge rounded-pill bg-primary">Primary</span>
                `,
      },
      {
        name: "Notification Badge",
        htmlTemplate: `
                <button type="button" class="btn btn-primary">
                    Notifications <span class="badge bg-secondary">4</span>
                </button>
                `,
      },
    ],
  },
  {
    name: "Breadcrumb",
    templates: [
      {
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
      },
      {
        name: "Breadcrumb Item",
        htmlTemplate: `
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                `,
      },
    ],
  },
  {
    name: "Buttons",
    templates: [
      {
        name: "Button",
        htmlTemplate: `
                <button type="button" class="btn btn-primary">Primary</button>
                `,
      },
      {
        name: "Button Outlined",
        htmlTemplate: `
                <button type="button" class="btn btn-outline-primary">Primary</button>
                `,
      },
      {
        name: "Button Group",
        htmlTemplate: `
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-secondary">Left</button>
                    <button type="button" class="btn btn-secondary">Middle</button>
                    <button type="button" class="btn btn-secondary">Right</button>
                </div>
                `,
      },
      {
        name: "Button Alert",
        htmlTemplate: `
                <button type="button" class="btn btn-primary position-relative">
                    Mails <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">+99 <span class="visually-hidden">unread messages</span></span>
                </button>
                `,
      },
    ],
  },
  {
    name: "Cards",
    templates: [
      {
        name: "Card with Image",
        htmlTemplate: `
                <div class="card">
                    <img src="https://via.placeholder.com/300x200?text=300x200" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                `,
        previewWidth: "500px",
      },
      {
        name: "Card Body only",
        htmlTemplate: `
                <div class="card">
                    <div class="card-body">
                        This is some text within a card body.
                    </div>
                </div>
                `,
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
        name: "Horizontal Card",
        htmlTemplate: `
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="https://via.placeholder.com/300x200?text=300x200" alt="...">
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
      },
    ],
  },
  {
    name: "Carousel",
    templates: [
      {
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
      },
    ],
  },
  {
    name: "Collapse",
    templates: [
      {
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
      },
      {
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
      },
    ],
  },
  {
    name: "Dropdown",
    templates: [
      {
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
      },
      {
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
      },
    ],
  },
  {
    name: "List Group",
    templates: [
      {
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
      },
      {
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
      },
    ],
  },
  {
    name: "Modal",
    templates: [
      {
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
      },
    ],
  },
  {
    name: "Navs & tabs",
    templates: [
      {
        name: "Nav",
        htmlTemplate: `
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Active</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li>
                </ul>
                `,
      },
    ],
  },
  {
    name: "Navbar",
    templates: [
      {
        name: "Navbar",
        htmlTemplate: `
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container">
                        <a class="navbar-brand" href="#">Navbar</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>
                            <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                            </li>
                        </ul>
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        </div>
                    </div>
                </nav>
                `,
      },
      {
        name: "Navbar Simple",
        htmlTemplate: `
                <nav class="navbar navbar-expand-lg navbar-light">
                    <div class="container">
                        <a class="navbar-brand" href="#">Navbar</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>
                        </ul>
                        </div>
                    </div>
                </nav>
                `,
      },
    ],
  },
  {
    name: "Offcanvas",
    templates: [
      {
        name: "Offcanvas",
        htmlTemplate: `
                <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offCanvas" aria-controls="offCanvas">
                    Offcanvas trigger
                </button>

                <div class="offcanvas offcanvas-start" tabindex="-1" id="offCanvas" aria-labelledby="offCanvasLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offCanvasLabel">Offcanvas</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <div>
                        Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
                        </div>
                    </div>
                </div>
                `,
      },
    ],
  },
  {
    name: "Pagination",
    templates: [
      {
        name: "Basic Pagination",
        htmlTemplate: `
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
                `,
      },
    ],
  },
  {
    name: "Progress Bar",
    templates: [
      {
        name: "Progress",
        htmlTemplate: `
                <div class="progress">
                    <div class="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                `,
      },
    ],
  },
];

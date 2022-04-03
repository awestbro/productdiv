import { TemplateDefinition } from "../../../utilities/configuration/configuration-importer";

export const Title: TemplateDefinition = {
  name: "Title",
  htmlTemplate: `
          <h1 class="text-bold">Title</h1>
          `,
  tags: ["Content"],
};

export const Subtitle: TemplateDefinition = {
  name: "Subtitle",
  htmlTemplate: `
          <h2 class="text-muted">Subtitle</h2>
          `,
  tags: ["Content"],
};
export const TitleAndSubtitle: TemplateDefinition = {
  name: "Title and Subtitle",
  htmlTemplate: `
    <h1 class="text-bold">Title</h1>
    <h2 class="text-muted">Subtitle</h2>
    `,
  tags: ["Content"],
};
export const PageHeader: TemplateDefinition = {
  name: "Page Header",
  htmlTemplate: `
          <h2 class="text-bold">Title</h2>
          <h3 class="text-muted">Subtitle</h3>
          <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consectetur commodo consequat.</p>
          `,
  tags: ["Content"],
};
export const HeadingH1: TemplateDefinition = {
  name: "Heading - H1",
  htmlTemplate: `<h1>Heading 1</h1>`,
  tags: ["Content"],
};
export const HeadingH2: TemplateDefinition = {
  name: "Heading - H2",
  htmlTemplate: `<h2>Heading 2</h2>`,
  tags: ["Content"],
};
export const HeadingH3: TemplateDefinition = {
  name: "Heading - H3",
  htmlTemplate: `<h3>Heading 3</h3>`,
  tags: ["Content"],
};
export const HeadingH4: TemplateDefinition = {
  name: "Heading - H4",
  htmlTemplate: `<h4>Heading 4</h4>`,
  tags: ["Content"],
};
export const HeadingH5: TemplateDefinition = {
  name: "Heading - H5",
  htmlTemplate: `<h5>Heading 5</h5>`,
  tags: ["Content"],
};
export const HeadingH6: TemplateDefinition = {
  name: "Heading - H6",
  htmlTemplate: `<h6>Heading 6</h6>`,
  tags: ["Content"],
};
export const Paragraph: TemplateDefinition = {
  name: "Paragraph",
  htmlTemplate: `
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consectetur commodo consequat. In condimentum fermentum augue, sit amet iaculis ante sagittis non. Fusce fringilla lacus id condimentum hendrerit. Cras posuere mi et tellus cursus mattis. Suspendisse pellentesque iaculis lectus a sagittis. Phasellus egestas orci lorem, eu vulputate nisi tempus sed. Fusce aliquet odio quis efficitur feugiat. Donec in nisl tincidunt erat euismod blandit. In semper, tortor non commodo sagittis, orci diam placerat lacus, at sodales diam metus tempor mauris.</p>
          `,
  tags: ["Content"],
};
export const BlockQuote: TemplateDefinition = {
  name: "Block Quote",
  htmlTemplate: `
          <div class="text-center">
              <blockquote class="blockquote">
                  <p class="">"A well-known quote, contained in a blockquote element."</p>
              </blockquote>
              <p>- Someone famous in <cite title="Source Title" class="fw-bold">Source Title</cite></p>
          </div>
          `,
  tags: ["Content"],
};
export const UnstyledList: TemplateDefinition = {
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
  tags: ["Content"],
};
export const Table: TemplateDefinition = {
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
  tags: ["Content"],
};
export const TableResponsive: TemplateDefinition = {
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
  tags: ["Content"],
};
export const InlineCode: TemplateDefinition = {
  name: "Inline Code",
  htmlTemplate: `
          <code>Inline</code>
          `,
  tags: ["Content"],
};
export const CodeBlock: TemplateDefinition = {
  name: "Code Block",
  htmlTemplate: `
<pre><code>&lt;p&gt;Sample text here...&lt;/p&gt;
&lt;p&gt;And another line of sample text here...&lt;/p&gt;
</code></pre>
          `,
  tags: ["Content"],
};
export const Variable: TemplateDefinition = {
  name: "Variable",
  htmlTemplate: `
          <var>y</var> = <var>m</var><var>x</var> + <var>b</var>
          `,
  tags: ["Content"],
};
export const UserInput: TemplateDefinition = {
  name: "User Input",
  htmlTemplate: `
          <kbd>cd</kbd>
          `,
  tags: ["Content"],
};
export const SampleOutput: TemplateDefinition = {
  name: "Sample output",
  htmlTemplate: `
          <samp>This text is meant to be treated as sample output from a computer program.</samp>
          `,
  tags: ["Content"],
};
export const ResponsiveImage: TemplateDefinition = {
  name: "Responsive Image",
  htmlTemplate: `
          <img src="https://via.placeholder.com/468x60?text=Responsive" class="img-fluid" alt="...">
          `,
  tags: ["Content"],
};
export const ImageThumbnail: TemplateDefinition = {
  name: "Image Thumbnail",
  htmlTemplate: `
          <img src="https://via.placeholder.com/200?text=200" class="img-thumbnail" alt="...">
          `,
  tags: ["Content"],
};
export const FigureImageWithCaption: TemplateDefinition = {
  name: "Figure Image with Caption",
  htmlTemplate: `
          <figure class="figure">
              <img src="https://via.placeholder.com/300x200?text=300x200" class="figure-img img-fluid rounded" alt="...">
              <figcaption class="figure-caption">A caption for the above image.</figcaption>
          </figure>
          `,
  tags: ["Content"],
};
export const Button: TemplateDefinition = {
  name: "Button",
  htmlTemplate: `
          <button type="button" class="btn btn-primary">Primary</button>
          `,
  tags: ["Content"],
};
export const ButtonOutlined: TemplateDefinition = {
  name: "Button Outlined",
  htmlTemplate: `
          <button type="button" class="btn btn-outline-primary">Primary</button>
          `,
  tags: ["Content"],
};
export const ButtonGroup: TemplateDefinition = {
  name: "Button Group",
  htmlTemplate: `
          <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-secondary">Left</button>
              <button type="button" class="btn btn-secondary">Middle</button>
              <button type="button" class="btn btn-secondary">Right</button>
          </div>
          `,
  tags: ["Content"],
};
export const ButtonAlert: TemplateDefinition = {
  name: "Button Alert",
  htmlTemplate: `
          <button type="button" class="btn btn-primary position-relative">
              Mails <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">+99 <span class="visually-hidden">unread messages</span></span>
          </button>
          `,
  tags: ["Content"],
};

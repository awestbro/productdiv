export const FormElement = {
  name: "Form Element",
  htmlTemplate: `
          <form class="py-3">
            <div class="productdiv-drop-container"></div>
          </form>
          `,
  tags: ["Form"],
};
export const EmailField = {
  name: "Email Field",
  htmlTemplate: `
          <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">Email address</label>
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
          </div> 
          `,
  tags: ["Form"],
};
export const PasswordField = {
  name: "Password Field",
  htmlTemplate: `
          <div class="mb-3">
              <label for="inputPassword" class="form-label">Password</label>
              <input type="password" class="form-control" id="inputPassword">
          </div>
          `,
  tags: ["Form"],
};
export const Textarea = {
  name: "Textarea",
  htmlTemplate: `
          <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
          `,
  tags: ["Form"],
};
export const FileSelect = {
  name: "File Select",
  htmlTemplate: `
          <div class="mb-3">
              <label for="formFile" class="form-label">Default file input example</label>
              <input class="form-control" type="file" id="formFile">
          </div>
          `,
  tags: ["Form"],
};
export const Select = {
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
  tags: ["Form"],
};
export const Checkbox = {
  name: "Checkbox",
  htmlTemplate: `
          <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                  Default checkbox
              </label>
          </div>
          `,
  tags: ["Form"],
};
export const RadioOptions = {
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
  tags: ["Form"],
};
export const LoginForm = {
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
  tags: ["Form"],
};

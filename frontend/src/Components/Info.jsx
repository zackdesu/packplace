import React from "react";

const Info = ({ session }) => {
  return (
    <>
      <div className="container">
        <h1 className="text-center">Your Profile</h1>
        <div className="row biodata d-flex justify-content-center mb-5 p-5">
          <div className="col-md-6">
            <img
              src="../files/img/unnamed.png"
              alt="Profile Picture"
              className="bio-profile rounded-circle m-auto d-block mb-3"
            />
            <form action="/about?_method=PUT" method="POST">
              <div className="mb-3 mt-4">
                <input type="hidden" name="_id" defaultValue="user" />
                <input type="hidden" name="oldEmail" defaultValue="email" />
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  minLength={3}
                  maxLength={20}
                  defaultValue={session.name}
                  required=""
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  defaultValue={session.email}
                  required=""
                />
              </div>
              <div className="col-button d-flex justify-content-center flex-column">
                <button type="submit" className="btn btn-success mx-2 my-1">
                  Edit Profile
                </button>
                <button
                  type="button"
                  className="btn btn-danger mx-2 my-1"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteAccount"
                >
                  Delete Account
                </button>
                <a href="#" className="btn btn-primary mx-2 my-1">
                  Change Password
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="deleteAccount"
        tabIndex={-1}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <form action="/about?_method=DELETE" method="post">
              <div className="modal-body">
                <h6>
                  Type <strong>username</strong> if you sure want to delete your
                  account.
                </h6>
                <input
                  type="text"
                  className="form-control"
                  id="confirmationName"
                  name="confirmationName"
                  minLength={3}
                  maxLength={20}
                  autoComplete="off"
                  required=""
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  Nevermind
                </button>
                <button
                  type="submit"
                  className="btn btn-danger disabled"
                  id="deleteButton"
                >
                  Yes, I am sure with my option
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="clear" />
      </div>
    </>
  );
};

export default Info;

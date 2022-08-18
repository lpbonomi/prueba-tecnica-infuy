export function EmailComponent(props) {
  return (
    <div className="mb-3">
      <label htmlFor="email" className="form-label">
        Email
      </label>
      <input
        type="email"
        className="form-control"
        id="email"
        name="email"
        required
        maxLength="50"
        autoComplete="username"
        onChange={(e) => props.setEmail(e.target.value)}
      ></input>
    </div>
  );
}

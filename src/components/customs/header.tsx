import { Button } from "../ui/button";

const header = () => {
  return (
    <header className="px-10 py-4">
      <nav className="flex items-center justify-around">
        <div>
          <h1 className="font-extrabold text-2xl text-center">
            Shio<span className="text-primary">Ri</span>
          </h1>
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="text-center">
            <Button>Login</Button>
          </div>
          <div className="text-center">
            <Button>Signup</Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default header;

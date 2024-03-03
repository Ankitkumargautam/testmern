import { ContextState } from '../../Context/ContextProvider';

const Employee = () => {
  const { user } = ContextState();
  console.log('user: ', user?.token);
  return (
    <div>
      <h1>Employee</h1>
    </div>
  );
};

export default Employee;

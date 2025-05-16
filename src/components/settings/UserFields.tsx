import React from "react";

interface UserFieldsProps {
  name: string;
  setName: (name: string) => void;
  surname: string;
  setSurname: (surname: string) => void;
}

const UserFields: React.FC<UserFieldsProps> = ({ name, setName, surname, setSurname }) => (
  <>
    <div>
      <label className="block text-sm font-medium text-black mb-2">
        Name
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black bg-white"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-black mb-2">
        Surname
      </label>
      <input
        type="text"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black bg-white"
      />
    </div>
  </>
);

export default UserFields; 
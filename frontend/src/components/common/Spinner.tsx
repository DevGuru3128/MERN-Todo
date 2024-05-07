const Spinner = () => {
  return (
    <tr className="w-screen py-6 flex items-center justify-center space-x-3 animate-pulse">
      <td className="w-6 h-6 bg-red-500 rounded-full"></td>
      <td className="w-6 h-6 bg-red-500 rounded-full"></td>
      <td className="w-6 h-6 bg-red-500 rounded-full"></td>
    </tr>
  );
};

export default Spinner;

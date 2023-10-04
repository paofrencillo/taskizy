// import { useOutletContext } from "react-router-dom";

export default function Tasks() {
  // const user = useOutletContext();

  return (
    <>
      <div className="flex flex-col p-8">
        <div className="">
          <div className="inline-block w-full">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Task
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Priority
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Room
                    </th>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b transition duration-300 ease-in-out hover:bg-purple-100">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      1
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">Mark</td>
                    <td className="whitespace-nowrap px-6 py-4">Otto</td>
                    <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                  </tr>
                  <tr className="border-b transition duration-300 ease-in-out hover:bg-purple-100">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      2
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                    <td className="whitespace-nowrap px-6 py-4">Thornton</td>
                    <td className="whitespace-nowrap px-6 py-4">@fat</td>
                  </tr>
                  <tr className="border-b transition duration-300 ease-in-out hover:bg-purple-100">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      3
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">Larry</td>
                    <td className="whitespace-nowrap px-6 py-4">Wild</td>
                    <td className="whitespace-nowrap px-6 py-4">@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useEffect } from "react";
import {
 
  RiEdit2Line,
  RiMoonLine,
  RiSettings5Line,
  RiShutDownLine,
  RiSunLine,

} from "react-icons/ri";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { useNightlyReceipts } from "../../hooks/useNightlyReceipts";
import { ModalFormReceipt } from "../Receipts/ModalFormReceipt";
import { useAuth } from "../../auth/hooks/useAuth";
export const DataTableVehicles = ({
  vehicles,
  handlerRemoveVehicle,
  handlerActivateVehicle,
  handlerVehicleSelectedForm,
  handlerOpenModalFormReceipt,
  userId,
}) => {
  const { handlerOpenModalFormNightlyReceipt, visibleFormNightlyReceiptModal } =
    useNightlyReceipts();

  const { login } = useAuth();

  return (
    <div className="bg-secondary-100 py-8 px-2 rounded-lg ">
      {/*Modal create Nightly receipt */}
      {!visibleFormNightlyReceiptModal || (
        <ModalFormReceipt receiptType={"nocturno"} />
      )}
      <div className="overflow-x-auto">
        <table className="table-auto border min-w-full ">
          <thead>
            <tr className="py-2 ">
              <th>Placa</th>
              <th>Vehiculo</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(({ id, plate, vehicleType, active, user }) => (
              <tr key={id} className="bg-secondary-900 text-center">
                <td className="border">{plate}</td>
                {active == true ? (
                  <td className="border">{vehicleType.name}</td>
                ) : (
                  <td className="border text-red-400">{vehicleType.name}</td>
                )}

                <td className="border flex  justify-center">
                  <Menu
                    menuButton={
                      <MenuButton
                        className="flex items-center gap-x-2 bg-primary/80 hover:bg-primary text-black
                       p-2 rounded-lg transition-colors my-2"
                      >
                        <RiSettings5Line />
                      </MenuButton>
                    }
                    align="end"
                    transition
                    menuClassName="bg-secondary-100 "
                  >
                    {active == true ? (
                      <>
                        <MenuItem className="p-0 hover:bg-transparent">
                          <button
                            className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900
                     flex items-center gap-x-2 p-2 flex-1"
                            onClick={() =>
                              handlerOpenModalFormReceipt({
                                id: id,
                                plate: plate,
                                vehicleType: vehicleType,
                                active: active,
                                user: user
                              })
                            }
                          >
                            <RiSunLine className="text-[#8DE800]" /> Generar
                            recibo diurno
                          </button>
                        </MenuItem>
                        {!login.isAdmin || (
                          <>
                            <MenuItem className="p-0 hover:bg-transparent">
                              <button
                                className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900
                     flex items-center gap-x-2 p-2 flex-1"
                                onClick={() =>
                                  handlerOpenModalFormNightlyReceipt({
                                    id: id,
                                    plate: plate,
                                    vehicleType: vehicleType,
                                    active: active,
                                  })
                                }
                              >
                                <RiMoonLine className="text-[#8DE800]" />{" "}
                                Generar recibo nocturno
                              </button>
                            </MenuItem>

                            <MenuItem className="p-0 hover:bg-transparent">
                              <button
                                className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900
                     flex items-center gap-x-2 p-2 flex-1"
                                onClick={() => {
                                  handlerVehicleSelectedForm({
                                    id: id,
                                    plate: plate,
                                    vehicleType: vehicleType,
                                  });
                                }}
                              >
                                <RiEdit2Line className="text-blue-500" /> Editar
                                vehiculo
                              </button>
                            </MenuItem>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}

                    {active == true ? (
                      <MenuItem className="p-0 hover:bg-transparent">
                        <button
                          className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900
                     flex items-center gap-x-2 p-2 flex-1"
                          onClick={() => handlerRemoveVehicle(userId, id)}
                        >
                          <RiShutDownLine className="text-red-500" /> Desactivar
                          vehiculo
                        </button>
                      </MenuItem>
                    ) : (
                      <MenuItem className="p-0 hover:bg-transparent">
                        <button
                          className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900
                     flex items-center gap-x-2 p-2 flex-1"
                          onClick={() => handlerActivateVehicle(userId, id)}
                        >
                          <RiShutDownLine className="text-green-500" /> Activar
                          vehiculo
                        </button>
                      </MenuItem>
                    )}
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

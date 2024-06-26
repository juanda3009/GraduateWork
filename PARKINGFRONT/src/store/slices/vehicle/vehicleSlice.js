import { createSlice } from "@reduxjs/toolkit";
import { initialUserForm } from "../user/usersSlice";

export const vehicleType = {
  id: 0,
  name: "",
};

export const initialVehicleForm = {
  id: 0,
  plate: "",
  vehicleType: null,
  active: true,
};

const initialErrorsVehicle = {
  plate: "",
  vehicleType: vehicleType,
};

export const vehicleSlice = createSlice({
  name: "vehicles",
  initialState: {
    vehicles: [],
    vehiclesAll: [],
    totalRegisteredVehicles: 0,
    vehiclesActive: [],
    vehiclesInactive: [],
    vehicleSelected: initialVehicleForm,
    visibleFormVehicle: false,
    errorsVehicle: initialErrorsVehicle,
  },
  reducers: {
    addVehicle: (state, action) => {
      state.vehicles = [
        ...state.vehicles,
        {
          ...action.payload,
        },
      ];

      state.vehiclesAll = [
        ...state.vehiclesAll,
        {
          ...action.payload,
        },
      ];

      state.vehicleSelected = initialUserForm;
      state.visibleFormVehicle = false;
    },
    updateVehicleSlice: (state, action) => {
      state.vehicles = state.vehicles.map((v) => {
        if (v.id === action.payload.id) {
          return {
            ...action.payload,
          };
        }
        return v;
      });
      state.vehicleSelected = initialVehicleForm;
      state.visibleFormVehicle = false;
    },

    loadingVehicles: (state, action) => {
      state.vehicles = action.payload;
    },
    loadingVehiclesActive: (state, action) => {
      state.vehiclesActive = action.payload;
    },
    loadingVehiclesInactive: (state, action) => {
      state.vehiclesInactive = action.payload;
    },
    loadingVehiclesAll: (state, action) => {
      state.vehiclesAll = action.payload;
    },
    loadingRegisteredVehicles: (state, action) => {
      state.totalRegisteredVehicles = action.payload;
    },
    onVehicleSelectedForm: (state, action) => {
      state.vehicleSelected = action.payload;
      state.visibleFormVehicle = true;
    },
    onOpenFormVehicle: (state) => {
      state.visibleFormVehicle = true;
    },
    onCloseFormVehicle: (state) => {
      state.visibleFormVehicle = false;
      state.vehicleSelected = initialVehicleForm;
    },
    loadingErrorVehicle: (state, action) => {
      state.errorsVehicle = action.payload;
    },
  },
});

export const {
  addVehicle,
  updateVehicleSlice,
  loadingVehicles,
  loadingVehiclesAll,
  loadingVehiclesActive,
  loadingVehiclesInactive,
  loadingRegisteredVehicles,
  onVehicleSelectedForm,
  onOpenFormVehicle,
  onCloseFormVehicle,
  loadingErrorVehicle,
} = vehicleSlice.actions;

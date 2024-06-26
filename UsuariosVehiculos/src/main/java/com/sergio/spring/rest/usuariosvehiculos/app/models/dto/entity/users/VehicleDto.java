package com.sergio.spring.rest.usuariosvehiculos.app.models.dto.entity.users;


import com.fasterxml.jackson.annotation.JsonProperty;

public class VehicleDto {
    private Long id;
    private String plate;

    @JsonProperty("user")
    private UserDto userDto;
    private VehicleTypeDto vehicleType;
    private Boolean active;

    public VehicleDto() {
    }

    public VehicleDto(Long id, String plate, UserDto userDto, VehicleTypeDto vehicleType, boolean active) {
        this.id = id;
        this.plate = plate;
        this.vehicleType = vehicleType;
        this.active = active;
        this.userDto = userDto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlate() {
        return plate;
    }

    public void setPlate(String plate) {
        this.plate = plate;
    }


    public VehicleTypeDto getVehicleType() {
        return vehicleType;
    }


    public void setVehicleType(VehicleTypeDto vehicleType) {
        this.vehicleType = vehicleType;
    }

    public UserDto getUserDto() {
        return userDto;
    }

    public void setUserDto(UserDto userDto) {
        this.userDto = userDto;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}

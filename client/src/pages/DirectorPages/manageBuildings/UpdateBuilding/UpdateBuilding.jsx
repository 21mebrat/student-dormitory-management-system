import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import useSwal from "../../../../hooks/useSWal";
import { useGetBuildingByIdQuery, useUpdateBuildingMutation } from "../../../../redux/feature/Director/directorApp";
import { UpdateBuildingSchema } from "../../../../utils/validationSchema";
import Title from "../../../../components/title/Title";
import InputField from "../../../../components/inputField/InputField";

const UpdateBuilding = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showSuccessAlert, showErrorAlert } = useSwal();
    const [updateBuilding, { isLoading }] = useUpdateBuildingMutation();
    const { data: building, isError, error } = useGetBuildingByIdQuery(id);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: building,
        resolver: yupResolver(UpdateBuildingSchema),
    });

    useEffect(() => {
        if (building) {
            setValue('buildingNumber', building.buildingNumber);
            setValue('floors', building.floors);
            setValue('location', building.location);
            setValue('description', building.description);
            setValue('rooms', building.rooms);
            setValue('id', id);
        }
    }, [building, setValue]);

    const onSubmit = async (data) => {
        try {
            const response = await updateBuilding(data).unwrap();
            showSuccessAlert(response.message || "Building updated successfully!");
            navigate('/director-dashboard/manage-buildings');
        } catch (error) {
            showErrorAlert(error.data?.message || "Failed to update building");
        }
    };

    return (
        <div className="update-building-container max-w-[50%] mx-auto">
            <Title title="Update Building" />
            <form onSubmit={handleSubmit(onSubmit)} className="update-building-form space-y-4">
                <InputField
                    label="Building Number"
                    name="buildingNumber"
                    register={register}
                    error={errors.buildingNumber?.message}
                    placeholder="Enter Building Number"
                />
                {errors.buildingNumber &&
                    <p className="text-red-500 flex gap-1 items-center m-1 p-0"> <span><FaInfoCircle /></span><span>{errors.buildingNumber?.message}</span></p>
                }
                <InputField
                    label="Number of Floors"
                    name="floors"
                    type="number"
                    placeholder="Enter Number of Floors"
                    register={register}
                    error={errors.floors?.message}
                />
                {errors.floors &&
                    <p className="text-red-500 flex gap-1 items-center m-1 p-0"> <span><FaInfoCircle /></span><span>{errors.floors?.message}</span></p>
                }
                <InputField
                    label="Location"
                    name="location"
                    placeholder="Enter Building Location"
                    register={register}
                    error={errors.location?.message}
                />
                {errors.location &&
                    <p className="text-red-500 flex gap-1 items-center m-1 p-0"> <span><FaInfoCircle /></span><span>{errors.location?.message}</span></p>
                }
                <InputField
                    label="Description"
                    name="description"
                    placeholder="Enter Description"
                    register={register}
                    error={errors.description?.message}
                />
                {errors.description &&
                    <p className="text-red-500 flex gap-1 items-center m-1 p-0"> <span><FaInfoCircle /></span><span>{errors.description?.message}</span></p>
                }
                <div>
                    <h3 className="text-xl font-semibold">Rooms</h3>
                    {building?.rooms?.map((room, index) => (
                        <div key={index} className="room-inputs space-y-4">
                            <div className="grid grid-cols-4 gap-4">
                                {/* Room Floor */}
                                <div>
                                    <InputField
                                        label={`Room ${index + 1} Floor`}
                                        name={`rooms[${index}].floorNumber`}
                                        type="number"
                                        placeholder="Enter Floor Number"
                                        register={register}
                                    />
                                    {errors?.rooms?.[index]?.floorNumber && (
                                        <p className="text-red-500 flex gap-1 items-center m-1 p-0">
                                            <span><FaInfoCircle /></span>
                                            <span>{errors?.rooms?.[index]?.floorNumber?.message}</span>
                                        </p>
                                    )}
                                </div>

                                {/* Room Number */}
                                <div>
                                    <InputField
                                        label={`Room ${index + 1} Room Number`}
                                        name={`rooms[${index}].roomNumber`}
                                        type="number"
                                        placeholder="Enter Room Number"
                                        register={register}
                                        error={errors?.rooms?.[index]?.roomNumber?.message}
                                    />
                                    {errors?.rooms?.[index]?.roomNumber && (
                                        <p className="text-red-500 flex gap-1 items-center m-1 p-0">
                                            <span><FaInfoCircle /></span>
                                            <span>{errors?.rooms?.[index]?.roomNumber?.message}</span>
                                        </p>
                                    )}
                                </div>

                                {/* Room Capacity */}
                                <div>
                                    <InputField
                                        label={`Room ${index + 1} Capacity`}
                                        name={`rooms[${index}].capacity`}
                                        type="number"
                                        placeholder="Enter Room Capacity"
                                        register={register}
                                        error={errors?.rooms?.[index]?.capacity?.message}
                                    />
                                    {errors?.rooms?.[index]?.capacity && (
                                        <p className="text-red-500 flex gap-1 items-center m-1 p-0">
                                            <span><FaInfoCircle /></span>
                                            <span>{errors?.rooms?.[index]?.capacity?.message}</span>
                                        </p>
                                    )}
                                </div>

                                {/* Current Occupants */}
                                <div>
                                    <InputField
                                        label={`Room ${index + 1} Current Occupants`}
                                        name={`rooms[${index}].currentOccupants`}
                                        type="number"
                                        placeholder="Enter Current Occupants"
                                        register={register}
                                        error={errors?.rooms?.[index]?.currentOccupants?.message}
                                    />
                                    {errors?.rooms?.[index]?.currentOccupants && (
                                        <p className="text-red-500 flex gap-1 items-center m-1 p-0">
                                            <span><FaInfoCircle /></span>
                                            <span>{errors?.rooms?.[index]?.currentOccupants?.message}</span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                    disabled={isLoading}
                >
                    {isLoading ? "Updating..." : "Update"}
                </button>
            </form>
        </div>
    );
};

export default UpdateBuilding;

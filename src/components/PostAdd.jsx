"use client";
import React, { useState } from "react";
import { Label, Textarea, TextInput, Modal } from "flowbite-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";


const PostAdd = ({ onCancel }) => {
  const [destino, setDestino] = useState("");
  const [detalhes, setDetalhes] = useState("");
  const [fotos, setFotos] = useState([]);
  const [nota, setNota] = useState(0);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [openModal] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("destino", destino);
    formData.append("detalhes", detalhes);
    formData.append("rating", nota);


    fotos.forEach((foto, i) => {
      console.log(`Foto ${i + 1}:`, foto);
      formData.append("fotos", foto);
    });

    checkFormData(formData);
    try {
      const response = await axios.post(
        "http://192.168.0.195:5000/viagem",
        formData
      );

      window.location.reload();
      toast.success(response.data.message || "Viagem adicionada com sucesso!");

    } catch (error) {
      toast.error("Ocorreu um erro ao adicionar sua viagem.");
      console.error(error);
    }
  };

  const checkFormData = (formData) => {
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
  };

  const handleFileChange = (acceptedFiles) => {
    setFotos((prevFotos) => [...prevFotos, ...acceptedFiles]);
  };

  const handleRemoveFoto = (index) => {
    setFotos((prevFotos) => prevFotos.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileChange,
    accept: ".png, .jpg, .jpeg",
    multiple: true,
    maxFiles: null, 
  });

  return (
    <Modal show={openModal} size={"lg"} onClose={onCancel}>
      <Modal.Header>Adicionar Viagem</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="destino" color="gray" value="Destino" />
            </div>
            <TextInput
              id="destino"
              placeholder="Destino"
              required
              color="gray"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
            />
          </div>
          <div className="max-w-md mt-4">
            <div className="mb-2 block">
              <Label htmlFor="detalhes" value="Detalhes" />
            </div>
            <Textarea
              id="detalhes"
              placeholder="Escreva os detalhes da sua viagem..."
              required
              rows={4}
              value={detalhes}
              onChange={(e) => setDetalhes(e.target.value)}
            />
          </div>

          <div id="fileUpload" className="max-w-md mt-4">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center pb-6 pt-5 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, JPEG (MAX. 1900x1200px)
                </p>
              </div>
            </div>
            <div className="flex flex-row">
            { fotos.length > 0 ? (
              fotos.map((foto, i) => (
                <div key={i} className="relative m-4">
                  <img
                    className="w-20"
                    src={URL.createObjectURL(foto)}
                    alt={`Foto ${i}`}
                  />
                  <button
                    className="w-7 h-7 p-1 text-xs absolute top-0 right-0 rounded-full bg-slate-950 hover:bg-slate-900 text-white"
                    type="button"
                    onClick={() => handleRemoveFoto(i)}
                  >
                    X
                  </button>
                </div>
              ))
            ) : (
              <p>Nenhuma foto selecionada</p>
            )}
              </div>
          </div>
          <div className="max-w-md mt-4">
            <Label htmlFor="rating">Avaliação</Label>
            <div>
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                  <label
                    key={i}
                    className="inline-flex items-center cursor-pointer"
                  >
                    <input
                      id={`rating-${ratingValue}`}
                      type="radio"
                      name="rating"
                      className="hidden text-lg"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                      onChange={(e) => setNota(e.target.value)}
                      required
                    />
                    <svg
                      className="w-6 h-6"
                      fill={
                        ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                      }
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                    >
                      <path d="M12 15.39l-3.763 2.787c-.402.297-.958-.074-.746-.516l1.423-3.89-3.667-2.732c-.396-.295-.18-.96.32-.96h4.56l1.38-3.86c.197-.552.73-.552.927 0l1.38 3.86h4.56c.5 0 .716.665.32.96l-3.667 2.732 1.423 3.89c.21.442-.344.813-.745.516L12 15.39z" />
                    </svg>
                  </label>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-slate-950 rounded-md py-4 text-white w-full max-w-md hover:bg-yellow-300"
          >
            CADASTRAR VIAGEM
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default PostAdd;

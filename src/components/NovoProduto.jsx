import React, { useState, useEffect } from "react";
import { FaSave, FaArrowLeft, FaBox, FaUpload, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { 
  getDownloadURL, 
  getStorage, 
  ref, 
  uploadBytesResumable 
} from "firebase/storage";
import { app } from "../firebase";

export default function NovoProduto() {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    preco_custo: "",
    quantidade: "",
    quantidade_minima: "1",
    categoria: "",
    imposto_id: "",
    codigo_barras: "",
    fornecedor: "",
    status: "Ativo",
    imageUrls: []
  });
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");
  const [impostos, setImpostos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const categorias = [
    "Eletrônicos",
    "Mobília",
    "Software",
    "Vestuário",
    "Alimentação",
    "Livros",
    "Esportes",
    "Beleza",
    "Casa",
    "Outros"
  ];

  useEffect(() => {
    // Carregar impostos
    const mockImpostos = [
      { id: 1, descricao: "IVA Padrão", valor: 17 },
      { id: 2, descricao: "IVA Reduzido", valor: 7 },
      { id: 3, descricao: "Isento", valor: 0 }
    ];
    setImpostos(mockImpostos);
  }, []);

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) { 
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError("");
          setUploading(false);
          setFiles([]);
        })
        .catch(() => {
          setImageUploadError("Erro ao carregar imagem (máx. 2MB por imagem)");
          setUploading(false);
        });
    } else {
      setImageUploadError("Máximo de 6 imagens são permitidas");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload está ${progress}% concluído`);
        },
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro do campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.preco || parseFloat(formData.preco) <= 0) newErrors.preco = "Preço deve ser maior que zero";
    if (!formData.quantidade || parseInt(formData.quantidade) < 0) newErrors.quantidade = "Quantidade inválida";
    if (!formData.categoria) newErrors.categoria = "Categoria é obrigatória";
    if (!formData.imposto_id) newErrors.imposto_id = "Imposto é obrigatório";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Simular cadastro
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aqui você faria a chamada API real
      // const response = await fetch("http://localhost:5000/api/produtos", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     ...formData,
      //     preco: parseFloat(formData.preco),
      //     preco_custo: parseFloat(formData.preco_custo || 0),
      //     quantidade: parseInt(formData.quantidade),
      //     quantidade_minima: parseInt(formData.quantidade_minima),
      //     empresa_id: localStorage.getItem("empresaId")
      //   })
      // });
      
      alert("Produto cadastrado com sucesso!");
      navigate("/admin/produtos");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar produto.");
    } finally {
      setLoading(false);
    }
  };

  const calcularPrecoComImposto = () => {
    if (!formData.preco || !formData.imposto_id) return 0;
    
    const imposto = impostos.find(i => i.id === parseInt(formData.imposto_id));
    if (!imposto) return parseFloat(formData.preco);
    
    const valorImposto = (parseFloat(formData.preco) * parseFloat(imposto.valor)) / 100;
    return (parseFloat(formData.preco) + valorImposto).toFixed(2);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            to="/admin/produtos"
            className="flex items-center text-[#6DA4AA] hover:text-[#5D9199] mb-2"
          >
            <FaArrowLeft className="mr-2" /> Voltar para produtos
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">Novo Produto</h1>
          <p className="text-gray-600">Adicione um novo produto ao catálogo</p>
        </div>
        
        <div className="w-12 h-12 bg-[#6DA4AA] rounded-lg flex items-center justify-center">
          <FaBox className="text-white text-xl" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Coluna 1 */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Produto *
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA] ${
                    errors.nome ? "border-red-300" : "border-gray-200"
                  }`}
                  placeholder="Ex: Laptop Dell Inspiron"
                />
                {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
                  placeholder="Descrição detalhada do produto..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preço de Venda (MZN) *
                  </label>
                  <input
                    type="number"
                    name="preco"
                    value={formData.preco}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA] ${
                      errors.preco ? "border-red-300" : "border-gray-200"
                    }`}
                    placeholder="0.00"
                  />
                  {errors.preco && <p className="text-red-500 text-sm mt-1">{errors.preco}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preço de Custo (MZN)
                  </label>
                  <input
                    type="number"
                    name="preco_custo"
                    value={formData.preco_custo}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço com Imposto
                </label>
                <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                  <span className="font-semibold text-[#6DA4AA]">
                    MZN {calcularPrecoComImposto()}
                  </span>
                </div>
              </div>
            </div>

            {/* Coluna 2 */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagens do Produto
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <div className="flex flex-col items-center">
                    <FaUpload className="text-gray-400 text-2xl mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Selecione até 6 imagens (máx. 2MB cada)
                    </p>
                    <div className="flex gap-2">
                      <label className="cursor-pointer bg-[#6DA4AA] text-white px-4 py-2 rounded-lg hover:bg-[#5D9199] transition">
                        <span>Selecionar Imagens</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={handleImageSubmit}
                        disabled={uploading || files.length === 0}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                      >
                        {uploading ? "Carregando..." : "Enviar"}
                      </button>
                    </div>
                  </div>
                  
                  {imageUploadError && (
                    <p className="text-red-500 text-sm mt-2 text-center">{imageUploadError}</p>
                  )}
                  
                  {formData.imageUrls.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Imagens selecionadas:</p>
                      <div className="grid grid-cols-3 gap-2">
                        {formData.imageUrls.map((url, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={url} 
                              alt={`Produto ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                            >
                              <FaTimes className="text-xs" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantidade em Estoque *
                  </label>
                  <input
                    type="number"
                    name="quantidade"
                    value={formData.quantidade}
                    onChange={handleChange}
                    min="0"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA] ${
                      errors.quantidade ? "border-red-300" : "border-gray-200"
                    }`}
                    placeholder="0"
                  />
                  {errors.quantidade && <p className="text-red-500 text-sm mt-1">{errors.quantidade}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantidade Mínima
                  </label>
                  <input
                    type="number"
                    name="quantidade_minima"
                    value={formData.quantidade_minima}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
                    placeholder="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria *
                </label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA] ${
                    errors.categoria ? "border-red-300" : "border-gray-200"
                  }`}
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.categoria && <p className="text-red-500 text-sm mt-1">{errors.categoria}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imposto *
                </label>
                <select
                  name="imposto_id"
                  value={formData.imposto_id}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA] ${
                    errors.imposto_id ? "border-red-300" : "border-gray-200"
                  }`}
                >
                  <option value="">Selecione um imposto</option>
                  {impostos.map(imposto => (
                    <option key={imposto.id} value={imposto.id}>
                      {imposto.descricao} ({imposto.valor}%)
                    </option>
                  ))}
                </select>
                {errors.imposto_id && <p className="text-red-500 text-sm mt-1">{errors.imposto_id}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código de Barras
                </label>
                <input
                  type="text"
                  name="codigo_barras"
                  value={formData.codigo_barras}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
                  placeholder="Ex: 7891234567890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fornecedor
                </label>
                <input
                  type="text"
                  name="fornecedor"
                  value={formData.fornecedor}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA4AA]"
                  placeholder="Ex: Dell Mozambique"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
            <Link
              to="/admin/produtos"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex items-center bg-[#6DA4AA] text-white px-6 py-2 rounded-lg hover:bg-[#5D9199] transition disabled:opacity-50"
            >
              <FaSave className="mr-2" />
              {loading ? "Cadastrando..." : "Cadastrar Produto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
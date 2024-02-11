import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../contact/contact.css'; // CSS faylimizni import qilamiz

interface FormData {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  agreement: boolean;
  errors: { [key: string]: string };
  image: File | null;
  country: string;
  successMessage: string;
}

interface ModalData {
  showModal: boolean;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    agreement: false,
    errors: {},
    image: null,
    country: '',
    successMessage: ''
  });

  const [modalData, setModalData] = useState<ModalData>({
    showModal: false
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files) { // Check if type is 'file' and files exist
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};
    
    if (formData.name.trim() === '') {
      errors.name = 'Ism kiritishingiz shart';
    }
    if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      errors.age = 'Yosh son bo\'lishi shart va musbat qiymat bo\'lishi kerak';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Noto\'g\'ri elektron pochta formati';
    }

    if (formData.password.trim() === '') {
      errors.password = 'Parol kiritishingiz shart';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Parollar mos kelmadi';
    }
    
    if (Object.keys(errors).length > 0) {
      setFormData({
        ...formData,
        errors: errors,
        successMessage: ''
      });
    } else {
      setModalData({
        showModal: true
      });
    }
  };

  const handleCloseModal = () => {
    setModalData({ showModal: false });
    setFormData({
      name: '',
      age: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      agreement: false,
      errors: {},
      image: null,
      country: '',
      successMessage: ''
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Ism va Familiyangizni kiriting</label>
          <input className='input' type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          {formData.errors.name && <p className="error">{formData.errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="age">Yosh (son bo'lishi kerak)</label>
          <input className='input' type="number" id="age" name="age" value={formData.age} onChange={handleChange} />
          {formData.errors.age && <p className="error">{formData.errors.age}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Elektron pochta</label>
          <input className='input' type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          {formData.errors.email && <p className="error">{formData.errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Parol (2 ta parol, mos kelishi kerak)</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
          {formData.errors.password && <p className="error">{formData.errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Parolni tasdiqlash</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          {formData.errors.confirmPassword && <p className="error">{formData.errors.confirmPassword}</p>}
        </div>
        <div className="form-group">
          <h3>Jinsi</h3>
          <input type="radio" id="male" name="gender" value="male" onChange={handleChange} />
          <label htmlFor="male">Erkak</label>
          <input type="radio" id="female" name="gender" value="female" onChange={handleChange} />
          <label htmlFor="female">Ayol</label>
        </div>
        <div className="form-group">
          <label htmlFor="image">Rasmni yuklang</label>
          <input type="file" id="image" name="image" accept="image/png, image/jpeg" onChange={handleChange} />
          {formData.image && <img src={URL.createObjectURL(formData.image)} alt="Rasm" className="uploaded-image" />}
        </div>

        <div className="form-group">
          <label htmlFor="country">Mamlakatni tanlang</label>
          <select id="country" name="country" value={formData.country} onChange={handleChange}>
            <option value="">Mamlakatni tanlang</option>
            <option value="UZ">O'zbekiston</option>
            <option value="US">Amerika Qo'shma Shtatlari</option>
          </select>
        </div>

        {formData.successMessage && <p className="success-message">{formData.successMessage}</p>}

        <button type="submit">Ro'yxatdan o'tish</button>
      </form>

      {/* Modal */}
      {modalData.showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Ro'yxat muvaffaqiyatli amalga oshirildi</h2>
            <p>Ism: {formData.name}</p>
            <p>Yosh: {formData.age}</p>
            <p>Email: {formData.email}</p>
            <p>Parol: {formData.password}</p>
            <p>Jinsi: {formData.gender}</p>
            <p>Mamlakat: {formData.country}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
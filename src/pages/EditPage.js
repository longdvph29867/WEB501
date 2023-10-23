import { useEffect, useState } from "../lib"
import * as Joi from "JOI"

export default function Edit(id) {
  const [book, setBook] = useState({})

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(res => res.json())
      .then(data => {
          setBook(data);
      })
  }, [])
  


  const schema = Joi.object({
    name: Joi.string().empty().required().messages({
      "string.base": "{#label} phải là chữ!",
      "string.empty": "{#label} trường bắt buộc!",
      "any.required": "{#label} trường bắt buộc!",
    }),
    nhaxuatban: Joi.string().empty().required().messages({
      "string.base": "{#label} phải là chữ!",
      "string.empty": "{#label} trường bắt buộc!",
      "any.required": "{#label} trường bắt buộc!",
    }),
    mota: Joi.string().empty().required().messages({
      "string.base": "{#label} phải là chữ!",
      "string.empty": "{#label} trường bắt buộc!",
      "any.required": "{#label} trường bắt buộc!",
    }),
    gia: Joi.number().empty().required().messages({
      "number.base": "{#label} phải là số!",
      "number.empty": "{#label} trường bắt buộc!",
      "any.required": "{#label} trường bắt buộc!",
    }),
    danhgia: Joi.string().empty().required().messages({
      "string.base": "{#label} phải là chữ!",
      "string.empty": "{#label} trường bắt buộc!",
      "any.required": "{#label} trường bắt buộc!",
    }),
  })

  function putBook(data) {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(() => {
        alert('Cập nhật SP thành công!');
        window.location.href = '/'
      })
  }

    useEffect(() => {
        const formCreate = document.getElementById('formCreate')
        formCreate.addEventListener('submit', function(e) {
            e.preventDefault()

            const formData = new FormData(formCreate);
            const name = formData.get('name')
            const nhaxuatban = formData.get('nhaxuatban')
            const mota = formData.get('mota')
            const gia = formData.get('gia')
            const danhgia = formData.get('danhgia')


            const newBook = {
                name,
                nhaxuatban,
                mota,
                danhgia,
            }

            if(gia != "") {
              newBook.gia = gia
            }
            const {error} = schema.validate(newBook)
            if(error) {
              document.querySelector('.error-el').innerText = error
              return;
            }
            putBook(newBook)
        })
    })

  return /*html*/`
    <div class="my-5 w-50 mx-auto">
        <h2 class="text-primary text-center my-3">Cập nhật</h2>

        <form action="" id='formCreate'>
            <div class="form-group mb-3">
              <label for="name">Name</label>
              <input type="text"
                class="form-control" name="name" id="name" placeholder="" value="${book.name}">
              <small id="helpId" class="form-text text-danger"></small>
            </div>
            <div class="form-group mb-3">
              <label for="nhaxuatban">Nhà xuất bản</label>
              <input type="text"
                class="form-control" name="nhaxuatban" id="nhaxuatban" placeholder="" value="${book.nhaxuatban}">
              <small id="helpId" class="form-text text-danger"></small>
            </div>
            <div class="form-group mb-3">
              <label for="mota">Mô tả</label>
              <textarea class="form-control" name="mota" id="mota" rows="3">${book.mota}</textarea>
            </div>
            <div class="form-group mb-3">
              <label for="gia">Giá</label>
              <input type="number"
                class="form-control" name="gia" id="gia" placeholder="" value="${book.gia}">
              <small id="helpId" class="form-text text-danger"></small>
            </div>
            <div class="form-group mb-3">
              <label for="danhgia">Đánh giá</label>
              <select class="form-control" name="danhgia" id="danhgia">
                <option value="">--Chọn--</option>
                <option ${book.danhgia == "1" ? "selected" : ""} value="1">1</option>
                <option ${book.danhgia == "2" ? "selected" : ""} value="2">2</option>
                <option ${book.danhgia == "3" ? "selected" : ""} value="3">3</option>
                <option ${book.danhgia == "4" ? "selected" : ""} value="4">4</option>
                <option ${book.danhgia == "5" ? "selected" : ""} value="5">5</option>
              </select>
            </div>
            <small id="helpId" class="error-el form-text text-danger"></small>
            <div>
                <button class="btn btn-primary">Cập nhật</button>
            </div>
        </form>
    </div>
  `
}

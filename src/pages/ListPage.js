import { useEffect, useState } from "../lib";

export default function ListPage() {

    const [listBook, setListBook] = useState([])

    function fetchData() {
        fetch(`http://localhost:3000/products`)
        .then(res => res.json())
        .then(data => {
            setListBook(data);
        })
    }

    useEffect(() => {
        fetchData()
    }, [])


    useEffect(() => {
        const listBtn = document.querySelectorAll('.delete-btn')
        listBtn.forEach(btn => {
            btn.addEventListener("click", function() {
                const id = btn.dataset.id

                if(confirm("Có Chắc Chắn XOá không!")) {
                    fetch(`http://localhost:3000/products/${id}`, {
                        method: "DELETE"
                    })
                    .then(() => {
                        alert("Xoá thành công!")
                        fetchData();
                    })
                }
            })
        })

        const formSearch = document.getElementById('form-search')
        formSearch.addEventListener('submit', function(e) {
            e.preventDefault()
            const key = document.querySelector('#search').value
            if(key) {
                fetch(`http://localhost:3000/products/?name_like=${key}`)
                .then(res => res.json())
                .then(data => {
                    setListBook(data);
                })
            }
            else {
                fetchData();
            }
        })

    })
    

  return /*html*/`
    <div class="container my-5">
        <a href="/create" class="btn btn-primary mb-3">Thêm mới</a>
            <div>
                <form action="" class="d-flex my-2" id="form-search">
                    <div class="form-group">
                    <input type="text"
                        class="form-control" name="search" id="search"  placeholder="Nhập tên...">
                    </div>
                    <button class="btn btn-primary ml-2">Search</button>
                </form>
            </div>
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Nhà xuất bản</th>
                    <th>Mô tả</th>
                    <th>Giá</th>
                    <th>Dánh giá</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>

            ${listBook.map(item => {
                return /*html*/`
                <tr>
                    <td>${item.name}</td>
                    <td>${item.nhaxuatban}</td>
                    <td>${item.mota}</td>
                    <td>${item.gia}</td>
                    <td>${item.danhgia}</td>
                    <td>
                        <a href="/edit/${item.id}" class="btn btn-primary">Edit</a>
                        <button data-id="${item.id}" class="delete-btn btn btn-danger">Delete</button>
                    </td>
            </tr>   
                `
            }).join('')}
                
            </tbody>
        </table>
    </div>
  `
}

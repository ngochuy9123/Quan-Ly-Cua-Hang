import {addDoc,doc,setDoc,deleteDoc,collection,getFirestore, getDocs,updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"

const db = getFirestore()
const dbRef = collection(db,"products")


let lstProduct = []
let isEdit = true

let tensp = document.getElementById("tensp"),
    slg = document.getElementById("slg"),
    giaNhap = document.getElementById("giaNhap"),
    giaBan = document.getElementById("giaBan"),
    ngayNhapHang = document.getElementById("ngayNhapHang"),
    ngayHetHan = document.getElementById("ngayHetHan"),
    img = document.getElementById("imgInput"),
    imgInput = document.querySelector(".img"),
    tinhTrang = document.getElementById("tinhTrang"),
    btnNewProduct = document.getElementById("btnOpenForm"),
    btnSubmit = document.getElementById("btnSubmit"),
    tblProduct = document.getElementById("data"),
    productForm = document.getElementById("productForm"),
    productTitle = document.getElementById("productFormTitle"),
    form = document.getElementById("myform")




    


// Get Products
async function getProducts(){
    try{
        const docSnap = await getDocs(dbRef);
        docSnap.forEach((doc) => {
            const product = doc.data()
            product.id = doc.id
            lstProduct.push(product)
        })
        console.log(lstProduct);
        showInfo()
    }
    catch (err){
        announce("error","Trang hiện tại đang bị lỗi ")
    }
}
getProducts()

// Show Info
function showInfo(){


    lstProduct.forEach((e) => {
        let createElement = `
            <tr class="productDetails">
                <td><img src="${e.image}" alt="" width="50" height="50"></td>
                <td>${e.tensp}</td>
                <td>${e.slg}</td>
                <td>${e.giaNhap}</td>
                <td>${e.giaBan}</td>
                <td>${e.ngayNhapHang}</td>
                <td>${e.ngayHetHan}</td>
                <td><span class="status ${e.tinhTrang}">${e.tinhTrang}</span></td>
                
                <td>
                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#readData" id='btnSee_${e.id}'><i class="bi bi-eye"></i></button>

                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#userForm" id='btnUpdate_${e.id}'><i class="bi bi-pencil-square"></i></button>

                    <button class="btn btn-danger" id='btnDelete_${e.id}'" ><i class="bi bi-trash"></i></button>
                                
                </td>
            </tr>
        `
        tblProduct.innerHTML += createElement
    })
    
    lstProduct.forEach((element) => {
        // Button See Detail Product
        let btnSeeDetail = document.getElementById(`btnSee_${element.id}`)
        btnSeeDetail.addEventListener('click', ()=> seeProductDetail(element))

        // Button Update
        let btnUpdate = document.getElementById(`btnUpdate_${element.id}`)
        btnUpdate.addEventListener('click', () => showFormUpdateProduct(element))
        // Button Delete
        let btnDelete = document.getElementById(`btnDelete_${element.id}`);
        btnDelete.addEventListener('click', () => deleteProduct(element.id));
    })
}



// Su Kien khi nhan nut Add Product
btnNewProduct.addEventListener('click', ()=> {
    isEdit = false
    imgInput.src = "./assets/imgs/Profile Icon.webp"
    form.reset()
    setDay()
})


// Add Product
form.addEventListener('submit', async (e)=> {
    e.preventDefault()

    const information = {
        image: imgInput.src == undefined ? "./assets/imgs/Profile Icon.webp" : imgInput.src,
        tensp: tensp.value,
        slg: slg.value,
        giaNhap: giaNhap.value,
        giaBan: giaBan.value,
        ngayNhapHang: ngayNhapHang.value,
        ngayHetHan: ngayHetHan.value,
        tinhTrang: tinhTrang.value
    }

    if (isEdit == false){
        await addProduct(information)
    }
    else{
        let idsp= document.getElementById("idsp").value
        const data = {
            id: idsp,
            image: imgInput.src == undefined ? "./assets/imgs/Profile Icon.webp" : imgInput.src,
            tensp: tensp.value,
            slg: slg.value,
            giaNhap: giaNhap.value,
            giaBan: giaBan.value,
            ngayNhapHang: ngayNhapHang.value,
            ngayHetHan: ngayHetHan.value,
            tinhTrang: tinhTrang.value
        }
        updateProduct(data)
    }

    resetTable()
    lstProduct = []
    getProducts()
      

})

async function addProduct(information){
    try{
        await addDoc(dbRef,{
            tensp: information.tensp,
            slg: information.slg,
            giaNhap: information.giaNhap,
            giaBan: information.giaBan,
            ngayNhapHang: information.ngayNhapHang,
            ngayHetHan: information.ngayHetHan,
            tinhTrang: information.tinhTrang,
            image: information.image
        })
        .then(()=>{
            announce("success","Thêm sản phẩm thành công")
        })
    }
    catch(err){
        console.log(err);
        announce("error","Thêm sản phẩm không thành công")
    }

    // Chinh giao dien sau khi them
    form.reset()
    setDay()
    imgInput.src = "./assets/imgs/Profile Icon.webp"
}


// Delete Product
async function deleteProduct(idsp){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
        swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then(async (result) => {
        if (result.isConfirmed) {

            const dbRefToDelete = doc(db, "products", idsp);
    
            try{
                await deleteDoc(dbRefToDelete)
                .then(()=>{
                    announce("success","Xóa sản phẩm thành công")
                })
            }
            catch (err){
                console.log(err);
                announce("error","Xóa sản phẩm không thành công")
            }
        
            resetTable()
            lstProduct = []
            getProducts()

            swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Product has been deleted.",
            icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
            });
        }
    });    
}


async function updateProduct(product){
    console.log(product);
    const dbRef = doc(db,"products",product.id)
    try{
        await updateDoc(dbRef,product)
        .then(()=>{
            announce("success","Cập nhật sản phẩm thành công")
        })
        form.reset()
        closeForm()
        imgInput.src = "./assets/imgs/Profile Icon.webp"
    }
    catch (err){
        console.log(err);
        announce("error","Cập nhật sản phẩm không thành công")

    }
}

// Các function phụ trợ
function announce(trangThai,tb){
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: trangThai,
        title: tb
    });
}


function setDay(){
    const currentDate = new Date();

    // Định dạng ngày thành chuỗi "YYYY-MM-DD"
    const formattedDate = currentDate.toISOString().split('T')[0];

    // Đặt giá trị cho trường ngày
    ngayNhapHang.value = formattedDate;
}

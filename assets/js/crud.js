function resetTable(){
    document.querySelectorAll('.productDetails').forEach(info => info.remove())
}

function showFormUpdateProduct(product){
    let tensp = document.getElementById("tensp"),
        slg = document.getElementById("slg"),
        giaNhap = document.getElementById("giaNhap"),
        giaBan = document.getElementById("giaBan"),
        ngayNhapHang = document.getElementById("ngayNhapHang"),
        ngayHetHan = document.getElementById("ngayHetHan"),
        imgInput = document.querySelector(".img"),
        tinhTrang = document.getElementById("tinhTrang"),
        btnSubmit = document.getElementById("btnSubmit")

    tensp.value = product.tensp
    imgInput.src = product.image
    slg.value = product.slg
    giaNhap.value = product.giaNhap
    giaBan.value = product.giaBan
    ngayNhapHang.value = product.ngayNhapHang
    ngayHetHan.value = product.ngayHetHan
    tinhTrang.value = product.tinhTrang

    let inpIDSP= document.getElementById("idsp")
    inpIDSP.value = product.id

    btnSubmit.innerText = "Update"
    // hien thi pop up
    document.querySelector('.form-popup-bg').classList.add('is-visible');
}


function seeProductDetail(product){
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

    tensp.value = product.tensp
    tensp.disabled = true;
    imgInput.src = product.image
    imgInput.disabled = true;
    slg.value = product.slg
    slg.disabled = true;
    giaNhap.value = product.giaNhap
    giaNhap.disabled = true;
    giaBan.value = product.giaBan
    giaBan.disabled = true;
    ngayNhapHang.value = product.ngayNhapHang
    ngayNhapHang.disabled = true;
    ngayHetHan.value = product.ngayHetHan
    ngayHetHan.disabled = true;
    tinhTrang.value = product.tinhTrang
    tinhTrang.disabled = true;

    btnSubmit.disabled = true;

    // hien thi pop up
    document.querySelector('.form-popup-bg').classList.add('is-visible');

}

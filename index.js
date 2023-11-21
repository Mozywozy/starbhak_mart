
  $(document).ready(function () {
    $("#cartKiri").hide();
    var products = [
        { id: 1, name: "Hot dog special", price: 40000 },
        { id: 2, name: "Kebab", price: 40000 },
        { id: 3, name: "Pizza", price: 50000 },
        { id: 4, name: "Burger", price: 35000 },
        { id: 5, name: "Ice Cream", price: 25000 },
        { id: 6, name: "Tacos", price: 30000 },
        { id: 7, name: "Burger", price: 30000 },
        { id: 8, name: "Ice Cream", price: 30000 },
        { id: 9, name: "Coffee", price: 30000 },
        { id: 10, name: "Milk", price: 30000 },
        { id: 11, name: "Donat", price: 30000 },
        { id: 12, name: "Corndog", price: 30000 }
    ];

    var cartItems = [];

    $(".btnAdd").on("click", function () {
        var productId = $(this).closest(".card").data("id");
        var product = products.find(item => item.id === productId);

        // Cek apakah produk sudah ada di dalam keranjang
        var existingItem = cartItems.find(item => item.id === productId);

        if (existingItem) {
            // Jika produk sudah ada, tambahkan qty-nya
            existingItem.qty += 1;
        } else {
            // Jika produk belum ada, tambahkan produk ke dalam keranjang
            cartItems.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
        }

        $("#cartKiri").show();
        // Memperbarui tampilan keranjang
        updateCartView();
    });

    $("#cart").on("click", ".btnRemove", function () {
        var indexToRemove = $(this).closest("li").index();
        var itemToRemove = cartItems[indexToRemove];

        if (itemToRemove.qty > 1) {
            // Jika qty lebih dari satu, kurangi qty-nya
            itemToRemove.qty -= 1;
        } else {
            // Jika qty satu, hapus item dari keranjang
            cartItems.splice(indexToRemove, 1);
        }

        updateCartView();
    });

    $("#btnPay").on("click", function () {
        if (cartItems.length === 0) {
            // Munculkan popup jika belum ada item yang dipilih
            alert("Anda belum memilih apapun");
        } else {
             // Menampilkan pajak dan total harga
             var totalHarga = 0;
             cartItems.forEach(item => {
                 totalHarga += item.price * item.qty;
             });
             
             var pajak = totalHarga * 0.1;
 
             // Menampilkan popup dengan pajak dan total harga
             alert("Starbhak Mart" + "\n-------------" + "\nPajak: " + pajak.toLocaleString("id-ID") + "\nTotal Harga: " + totalHarga.toLocaleString("id-ID") + "" + "\nTerimakasih sudah belanja" );
 
             // Reset semua item di cartKiri
             cartItems = [];
             updateCartView();
        }
    });

    function updateCartView() {
        var cartKiri = $("#cartKiri");
        var pajakSpan = $("#pajak");
        var qty2Span = $("#qty2");

        cartKiri.empty();

        var totalHarga = 0;

        cartItems.forEach(item => {
            totalHarga += item.price * item.qty;
            cartKiri.append(
                `<li class="d-flex align-items-center justify-content-between border border-black px-3 py-2" style="background-color: white; border: 1px solid #000; outline: 1px solid #000;">
                    <div class="listItem"> 
                        <p>${item.name}</p>
                        <p>Jumlah : <span id="qty1">${item.qty}</span></p>
                    </div>
                    <button class="btn btn-outline-danger btnRemove" type="button">Del</button>
                </li>`
            );
        });

         // Menghitung pajak (10% dari total harga)
         var pajak = totalHarga * 0.1;
         totalHarga += pajak;

        // Memperbarui tampilan pajak dan total harga
        pajakSpan.text(pajak.toLocaleString("id-ID"));
        qty2Span.text(totalHarga.toLocaleString("id-ID"));
    }
});
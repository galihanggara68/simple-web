function hitung(){
	
	// Mencari jenis kendaraan yang dipilih user
	const filter = function(arr){
		let ret = null;
		for(let i = 0; i < arr.length; i++){
			if(arr[i].checked){
				ret = arr[i];
			}
		}
		return ret;
	};
	
	// Mendapatkan selisih waktu
	const getDiffTime = function(time1, time2){
		
		// *Private function, digunakan untuk membelah/split jam dan menit
		function splitTime(time){
			return time.split(":").map(t => parseInt(t));
		}
		
		let splittedTime1 = splitTime(time1);
		let splittedTime2 = splitTime(time2);
		let diffHour = Math.abs(splittedTime1[0]-splittedTime2[0]);
		let diffMinute = Math.abs(splittedTime1[1]-splittedTime2[1]);
		
		// Return array
		return [diffHour, diffMinute];
	};
	
	// Function untuk menghitung total cost parkir
	const countCost = function(type, time){
		// Satu jam pertama
		const cost = (type == "1" ? 5000 : 2000 );
		
		// Biaya progresif
		const progressive = (type == "1" ? 3000 : 1000 );
		
		// Total cost
		const totalCost = (cost*(time-(time-1)) + (progressive*(time-1)));
		return totalCost;
	};
	// Input plat nomer
	let platNo = plat.value;
	
	// Input jenis kendaraan
	let jenis = filter(document.querySelectorAll("input[name=jenis]"));
	
	// Input waktu masuk
	let waktuMasuk = masuk.value;
	
	// Input waktu keluar
	let waktuKeluar = keluar.value;
	
	// Mendapatkan selisih waktu
	let time = getDiffTime(waktuMasuk, waktuKeluar);
	
	// Jika menit lebih dari 0, maka tambah jam
	time[0] = (time[1] > 0 ? time[0]+1 : time[0]);
	
	// Menghitung cost parkir
	let cost = countCost(jenis.value, time[0]);
	
	// Cetak Struk
	let report = "";
	report += "==Struk Parkir==\n";
	report += `${platNo}\n`;
	report += `${time[0]} Jam\n`;
	report += `Rp ${cost}.,-\n`;
	// Masukan value ke struk
	struk.value = report;
}
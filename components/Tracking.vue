<template>
  <div class="  ">
    <div class="flex justify-center items-center py-5 gap-2">
      <input
        v-model="trackingInput"
        type="text"
        placeholder="Enter Tracking ID"
        class="px-2 py-2 rounded-md border border-gray-500"
      />
      <button
        @click="trackShipment"
        class="px-4 py-2 rounded-md bg-blue-500 text-white flex items-center gap-2"
        :disabled="loading"
      >
        <span
          v-if="loading"
          class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"
        ></span>
        <span v-else>Track</span>
      </button>
    </div>
    <div
      v-if="alert.show"
      :class="alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'"
      class="fixed bottom-1 right-5 text-white px-4 py-3 rounded-lg shadow-md transition-opacity duration-500"
    >
      {{ alert.message }}
    </div>
    <div v-if="foundShipment" class="max-w-3xl mx-auto p-6 bg-white rounded-lg">
      <div
        class="flex flex-col w-full font-semibold mb-4 justify-center items-center py-3"
      >
        <div class="w-full">
          <img class="w-16" src="/images/logo.png" alt="" />
          Motion Experts
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
        <div class="border p-3 rounded-lg">
          <h3 class="text-sm font-semibold text-gray-500 mb-3">Tracking ID</h3>
          <p class="text-sm text-gray-700 font-medium">
            {{ shipmentData.trackingId || "N/A" }}
          </p>
          <hr class="my-4" />
          <h3 class="text-sm font-semibold text-gray-500 mb-3">Status</h3>
          <p
            class="text-xs md:text-sm text-gray-50 bg-green-500 w-20 py-2 pl-3 rounded-3xl font-medium"
          >
            {{ shipmentData.status || "Pending" }}
          </p>
          <!-- Shipment Information -->
          <div class="mb-4 mt-2">
            <h3 class="text-sm font-semibold text-gray-600">Shipment Info:</h3>
            <p class="text-gray-700 text-sm">{{ shipmentData.shipmentInfo }}</p>
            <!-- ✅ Show Shipment Info -->
          </div>
        </div>

        <div class="p-3 rounded-sm">
          <h3 class="text-sm md:text-xl font-semibold text-gray-500 mb-3">
            Shipment Dates
          </h3>
          <p class="text-sm md:text-xl text-gray-700">
            <strong>Expected Delivery:</strong>
            {{ shipmentData.expectedDelivery || "N/A" }}
          </p>
          <p class="text-sm md:text-xl text-gray-700">
            <strong>Departure Date:</strong>
            {{ shipmentData.departureDate || "N/A" }}
          </p>
          <p class="text-sm md:text-xl text-gray-700">
            <strong>Weight:</strong> {{ shipmentData.weight || "N/A" }} kg
          </p>
          <p class="text-sm md:text-xl text-gray-700">
            <strong>Shipment Mode:</strong> {{ shipmentData.mode || "N/A" }}
          </p>
        </div>
      </div>

      <hr class="sma:hidden ml-3 w-11/12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
        <div class="p-3 rounded-sm">
          <h3 class="text-sm md:text-xl font-semibold text-gray-500 mb-3">
            Location Info
          </h3>
          <p class="text-sm md:text-xl text-gray-700">
            <strong>Previous Location:</strong> {{ shipmentData.location.previous }}
          </p>
          <p class="text-sm md:text-xl text-gray-700">
            <strong>Current Location:</strong> {{ shipmentData.location.current }}
          </p>
        </div>
      </div>

      <hr class="sma:hidden ml-3 w-11/12" />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
        <div class="p-3 rounded-sm">
          <h3 class="text-sm md:text-xl font-semibold text-gray-500 mb-3">
            Shipper Info
          </h3>
          <p class="text-sm md:text-xl text-gray-700">
            <strong>Name:</strong> {{ shipmentData.shipper.name }}
          </p>
          <p class="text-sm md:text-xl text-gray-700">
            <strong>Address:</strong> {{ shipmentData.shipper.address }}
          </p>
          <p class="text-sm md:text-xl text-gray-700">
            <strong>Phone:</strong> {{ shipmentData.shipper.phoneNumber }}
          </p>
          <p class="text-sm md:text-xl text-gray-700">
            <strong>Email:</strong> {{ shipmentData.shipper.email }}
          </p>
        </div>
        <hr class="sma:hidden ml-3 w-11/12" />
        <div class="p-3 rounded-sm">
          <h3 class="text-sm md:text-xl font-semibold text-gray-500 mb-3">
            Receiver Info
          </h3>
          <p class="text-sm md:text-xl text-gray-700">
            <strong>Name:</strong> {{ shipmentData.receiver.name }}
          </p>
          <p class="text-sm md:text-xl text-gray-700">
            <strong>Address:</strong> {{ shipmentData.receiver.address }}
          </p>
          <p class="text-sm md:text-xl text-gray-700">
            <strong>Phone:</strong> {{ shipmentData.receiver.phoneNumber }}
          </p>
          <p class="text-sm md:text-xl text-gray-700">
            <strong>Email:</strong> {{ shipmentData.receiver.email }}
          </p>
        </div>
      </div>
      <hr class="sma:hidden ml-3 w-11/12" />

      <!-- 📸 Shipment Images Section -->
      <div v-if="shipmentData.shipmentImages?.length" class="mb-4">
        <h3 class="text-sm font-semibold text-gray-500 mb-3">
          Shipment Images
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="(image, index) in shipmentData.shipmentImages"
            :key="index"
            class="relative group"
          >
            <img
              :src="image"
              alt="Shipment Image"
              class="size-48 object-cover rounded-lg -md"
            />
            <a
              :href="image"
              target="_blank"
              class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm font-semibold transition"
            >
              View Full Image
            </a>
          </div>
        </div>
      </div>
      <p v-else class="text-gray-500 text-sm">
        No images available for this shipment.
      </p>

      <div class="mb-4">
        <h3 class="text-sm md:text-xl font-semibold text-gray-500 mb-3">
          Shipment Details
        </h3>
        <ul
          v-if="shipmentData.details?.length"
          class="list-inside list-disc text-gray-700"
        >
          <li
            v-for="(detail, index) in shipmentData.details"
            :key="index"
            class="text-sm"
          >
            <strong>{{ detail.placeholder }}:</strong>
            {{ detail.value || "Not Provided" }}
          </li>
        </ul>
        <p v-else class="text-gray-500">No shipment details available.</p>
      </div>

      <!-- Print Receipt Button -->
      <div class="text-center mt-6">
        <client-only>
          <button
            @click="printReceipt"
            class="px-4 py-2 rounded-md bg-blue-600 text-white"
          >
            Print Receipt
          </button>
        </client-only>
      </div>

      <div class="text-center text-gray-600 mt-12">
        <p>
          Shipment information is provided for reference purposes only. Please
          contact customer support for further inquiries.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getApp } from "firebase/app";

const db = getFirestore(getApp());

const trackingInput = ref("");
const loading = ref(false);
const foundShipment = ref(false);
const shipmentData = ref({});
const alert = ref({ show: false, message: "", type: "success" });

const showAlert = (message, type = "success") => {
  alert.value = { show: true, message, type };
  setTimeout(() => {
    alert.value.show = false;
  }, 3000);
};

// Function to track shipment
const trackShipment = async () => {
  if (!trackingInput.value) {
    showAlert("Please enter a Tracking ID", "error");
    return;
  }

  loading.value = true;
  foundShipment.value = false;

  try {
    const shipmentsRef = collection(db, "shipments");
    const q = query(
      shipmentsRef,
      where("trackingID", "==", trackingInput.value.trim())
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        shipmentData.value = {
          trackingId: data.trackingID || "N/A",
          status: data.status || "Pending",
          shipmentInfo: data.shipmentInfo || "No additional info provided.", // ✅ Add Shipment Info
          expectedDelivery: data.shipmentDetails?.[5]?.value || "N/A",
          departureDate: data.shipmentDetails?.[7]?.value || "N/A",
          weight: data.shipmentDetails?.[6]?.value || "N/A",
          mode: data.shipmentDetails?.[9]?.value || "N/A",
          details: data.shipmentDetails || [],
          shipper: {
            name: data.shipper?.[0]?.value || "N/A",
            address: data.shipper?.[1]?.value || "N/A",
            phoneNumber: data.shipper?.[2]?.value || "N/A",
            email: data.shipper?.[3]?.value || "N/A",
          },
          receiver: {
            name: data.receiver?.[0]?.value || "N/A",
            address: data.receiver?.[1]?.value || "N/A",
            phoneNumber: data.receiver?.[2]?.value || "N/A",
            email: data.receiver?.[3]?.value || "N/A",
          },
          location: {
            previous: data.location?.[0]?.value || "N/A",
            current: data.location?.[1]?.value || "N/A",
          },
          shipmentImages: data.shipmentImages || [],
        };

        foundShipment.value = true;
        showAlert("Shipment found successfully!", "success");
      });
    } else {
      showAlert("Shipment not found!", "error");
    }
  } catch (error) {
    showAlert("Error fetching shipment!", "error");
  }

  loading.value = false;
};

const printReceipt = async () => {
  try {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();

    if (!shipmentData.value) {
      console.error("Error: shipmentData is undefined");
      return;
    }

    let y = 20; // Starting position

    // Background Style
    doc.setFillColor(240, 240, 240); // Light gray background
    doc.rect(5, 5, 200, 287, "F"); // Full page background

    // Title Section
    doc.setFillColor(50, 50, 50);
    doc.rect(10, 10, 190, 15, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Shipment Receipt", 105, 20, { align: "center" });
    y += 20;

    // Add Border
    doc.setDrawColor(0);
    doc.rect(10, 10, 190, 270);

    // Shipment Image (If Available) - Top Right Corner
    if (shipmentData.value.imageUrl) {
      const img = new Image();
      img.src = shipmentData.value.imageUrl;
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        doc.addImage(img, "JPEG", 150, 15, 40, 40); // Positioned at top-right
        generateReceiptContent(doc, y);
      };
    } else {
      generateReceiptContent(doc, y);
    }

    function generateReceiptContent(doc, y) {
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);

      // Shipment Details
      const details = [
        ["Tracking ID:", shipmentData.value.trackingId || "N/A"],
        ["Status:", shipmentData.value.status || "N/A"],
        ["Shipment Mode:", shipmentData.value.mode || "N/A"],
        ["Weight:", `${shipmentData.value.weight || "N/A"} kg`],
        ["Departure Date:", shipmentData.value.departureDate || "N/A"],
        ["Expected Delivery:", shipmentData.value.expectedDelivery || "N/A"],
      ];

      details.forEach(([label, value]) => {
        doc.setFont("helvetica", "bold");
        doc.text(label, 15, y);
        doc.setFont("helvetica", "normal");
        doc.text(value, 70, y);
        y += 10;
      });

      y += 5;
      doc.setDrawColor(150);
      doc.line(10, y, 200, y);
      y += 10;

      // Boxed Sections for Shipper and Receiver
      const addSection = (title, data, startY) => {
        doc.setFillColor(220, 220, 220);
        doc.rect(10, startY, 190, 10, "F");
        doc.setFont("helvetica", "bold");
        doc.text(title, 15, startY + 7);

        let newY = startY + 15;
        data.forEach(([label, value]) => {
          doc.setFont("helvetica", "bold");
          doc.text(label, 15, newY);
          doc.setFont("helvetica", "normal");
          doc.text(value, 70, newY);
          newY += 8;
        });
        return newY;
      };

      y = addSection(
        "Shipper Information",
        [
          ["Name:", shipmentData.value.shipper?.name || "N/A"],
          ["Address:", shipmentData.value.shipper?.address || "N/A"],
          ["Phone:", shipmentData.value.shipper?.phoneNumber || "N/A"],
          ["Email:", shipmentData.value.shipper?.email || "N/A"],
        ],
        y
      );

      y = addSection(
        "Receiver Information",
        [
          ["Name:", shipmentData.value.receiver?.name || "N/A"],
          ["Address:", shipmentData.value.receiver?.address || "N/A"],
          ["Phone:", shipmentData.value.receiver?.phoneNumber || "N/A"],
          ["Email:", shipmentData.value.receiver?.email || "N/A"],
        ],
        y + 10
      );

      doc.save(
        `Shipment_Receipt_${shipmentData.value.trackingId || "Unknown"}.pdf`
      );
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
</script>

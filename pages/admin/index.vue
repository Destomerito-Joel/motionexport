<template>
  <div>
    <div class="bg-gray-900 pl-20 py-2 pb-5">
      <h1 class="text-white font-semibold">Welcome, Admin</h1>
    </div>
    <div class="w-full flex justify-center -mt-3">
      <div
        class="rounded-lg w-3/4 flex flex-col md:flex-row items-center justify-center shadow-md gap-8 p-5 bg-white"
      >
        <!-- Admin Count -->
        <div
          class="rounded-lg border flex flex-col items-center justify-center w-[75%] py-2 border-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-20 text-gray-900"
          >
            <path
              fill-rule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Admins: 1</span>
        </div>

        <!-- Shipment Count -->
        <nuxt-link
          to="/admin/shipments"
          class="rounded-lg border flex flex-col items-center justify-center w-[75%] py-2 border-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-20 text-gray-900"
          >
            <path
              d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z"
            />
            <path
              d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z"
            />
            <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
          </svg>
          <span>Shipments: {{ shipmentCount }}</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: "dashboard",
});
import { ref, onMounted } from "vue";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Firestore instance
const db = getFirestore();

// Reactive state
const adminCount = ref(0);
const shipmentCount = ref(0);

// Fetch Total Users Count from Firestore
const fetchAdminCount = async () => {
  try {
    const usersCollection = collection(db, "users");
    const snapshot = await getDocs(usersCollection);

    // Debugging: Check if any users are retrieved
    console.log("Users Collection Snapshot:", snapshot.docs.map(doc => doc.data()));

    adminCount.value = snapshot.size;
  } catch (error) {
    console.error("Error fetching admin count:", error);
  }
};


// Fetch Total Shipments Count from Firestore
const fetchShipmentsCount = async () => {
  try {
    const shipmentCollection = collection(db, "shipments");
    const snapshot = await getDocs(shipmentCollection);
    shipmentCount.value = snapshot.size; // Total number of shipments
  } catch (error) {
    console.error("Error fetching shipments count:", error);
  }
};

// Fetch data when component is mounted
onMounted(() => {
  fetchAdminCount();
  fetchShipmentsCount();
});
</script>


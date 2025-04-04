<template>
  <section class="py-16 bg-white text-center">
    <div class="container mx-auto px-6">
      <!-- Title -->
      <div class="text-center mb-12">
        <p class="text-green-600 font-semibold mt-2">Our Services</p>
        <h2
          class="text-2xl md:text-3xl font-bold text-gray-900 mt-4 leading-relaxed"
        >
          What We Can Do For You
        </h2>
      </div>

      <!-- Services Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Land Transport -->
        <div class="p-6 hover:bg-green-700 hover:text-white py-16 border">
          <div class="flex justify-center mb-4 text-green-600">
            <svg
              class="w-12 h-12 text-green-600 mb-3"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="currentColor">
                <path
                  d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75z"
                />
                <path
                  d="M8.25 19.5a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0m7.5-12.75a.75.75 0 0 0-.75.75v11.25q0 .13.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.66 18.66 0 0 0-3.732-10.104a1.84 1.84 0 0 0-1.47-.725z"
                />
                <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0" />
              </g>
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-4 leading-snug hover:text-white">
            Land Transport
          </h3>
          <p class="text-sm leading-loose hover:text-gray-50 mt-2">
            Truckload service stands above the competition because of the size
            of our carrier network and our ability to maximize supply chain
            efficiencies by keeping our customers constantly informed of their
            shipment’s location and status. Companies that partner with us can
            be confident that their shipments will be handled by only the most
            professional carriers and will arrive on time and intact.
          </p>
        </div>

        <!-- Ship Transport -->
        <div class="p-6 bg-white text-gray-900 py-16 border">
          <div class="flex justify-center mb-4">
            <svg
              class="w-12 h-12 text-green-600 mb-3"
              xmlns="http://www.w3.org/2000/svg"
              width="2048"
              height="1792"
              viewBox="0 0 2048 1792"
            >
              <path
                fill="currentColor"
                d="M1811 1555q19-19 45-19t45 19l128 128l-90 90l-83-83l-83 83q-18 19-45 19t-45-19l-83-83l-83 83q-19 19-45 19t-45-19l-83-83l-83 83q-19 19-45 19t-45-19l-83-83l-83 83q-19 19-45 19t-45-19l-83-83l-83 83q-19 19-45 19t-45-19l-83-83l-83 83q-19 19-45 19t-45-19l-83-83l-83 83q-19 19-45 19t-45-19L19 1645l90-90l83 83l83-83q19-19 45-19t45 19l83 83l83-83q19-19 45-19t45 19l83 83l83-83q19-19 45-19t45 19l83 83l83-83q19-19 45-19t45 19l83 83l83-83q19-19 45-19t45 19l83 83l83-83q19-19 45-19t45 19l83 83zm-1574-38q-19 19-45 19t-45-19L19 1389l90-90l83 82l83-82q19-19 45-19t45 19l83 82l64-64v-293L302 710q-17-26-7-56.5t40-40.5l177-58V256h128V128h256V0h256v128h256v128h128v299l177 58q30 10 40 40.5t-7 56.5l-210 314v293l19-18q19-19 45-19t45 19l83 82l83-82q19-19 45-19t45 19l128 128l-90 90l-83-83l-83 83q-18 19-45 19t-45-19l-83-83l-83 83q-19 19-45 19t-45-19l-83-83l-83 83q-19 19-45 19t-45-19l-83-83l-83 83q-19 19-45 19t-45-19l-83-83l-83 83q-19 19-45 19t-45-19l-83-83l-83 83q-19 19-45 19t-45-19l-83-83zM640 384v128l384-128l384 128V384h-128V256H768v128z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-blue-900 mb-4 leading-snug">
            Ship Transport
          </h3>
          <p class="text-sm leading-loose text-gray-600 mt-2">
            We provide different cargo insurance options that protect against
            loss or damage to your cargo in transit overseas. Cargo insurance is
            essential to ocean freight transportation and protects your goods
            from seawater flooding, storms and acts of God, vessel collision,
            and other unforeseeable events.
          </p>
        </div>

        <!-- Air Transport -->
        <div class="p-6 bg-white text-gray-900 py-16 border">
          <div class="flex justify-center mb-4">
            <svg
              class="w-12 h-12 text-green-600 mb-3"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M3.414 13.778L2 15.192l4.949 2.121l2.122 4.95l1.414-1.414l-.707-3.536L13.091 14l3.61 7.704l1.339-1.339l-1.19-10.123l2.828-2.829a2 2 0 1 0-2.828-2.828l-2.903 2.903L3.824 6.297L2.559 7.563l7.644 3.67l-3.253 3.253z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-blue-900 mb-4 leading-snug">
            Air Transport
          </h3>
          <p class="text-sm leading-loose text-gray-600 mt-2">
            Our tracking systems and proactive approach to customer service
            provide you with timely updates about the status of your freight.
            These systems also provide Air Freight customer service teams the
            tools to keep your shipment on schedule and to provide real-time
            communications with you, the customer.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

"use client";
import { useAuthContext } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { CircleDollarSign } from "lucide-react";
import { toast } from "sonner";
import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export const creditsPlans = [
  { credits: 10, cost: 1 },
  { credits: 50, cost: 5 },
  { credits: 100, cost: 9 },
  { credits: 200, cost: 15 },
  { credits: 500, cost: 30 },
];

function Billing() {
  const { user, setUser } = useAuthContext();
  const updateUserCredits = useMutation(api.users.UpdateUserCredits);
  const [visibleButtonIndex, setVisibleButtonIndex] = useState(null);

  const onPaymentSuccess = async (cost, credits) => {
    const result = await updateUserCredits({
      uid: user?._id,
      credits: Number(user?.credits) + Number(credits),
    });

    setUser((prev) => ({
      ...prev,
      credits: Number(user?.credits) + Number(credits),
    }));

    toast("Credits Added!");
    setVisibleButtonIndex(null); // hide PayPal button after success
  };

  return (
    <div className="">
      <h2 className="font-bold text-3xl">Credits</h2>

      <div className="p-4 border rounded-xl flex justify-between mt-7 max-w-2xl">
        <div>
          <h2 className="font-bold text-xl">Total Credits Left</h2>
          <h2 className="text-sm">1 Credit = 1 Video</h2>
        </div>
        <h2 className="font-bold text-3xl">{user?.credits} Credits</h2>
      </div>

      <p className="text-sm p-5 text-gray-500 max-w-2xl">
        When your credit balance reaches $0, your video generation will stop working. Add credits to continue.
      </p>

      <div className="mt-5">
        <h2 className="font-bold text-2xl">Buy Credits</h2>

        {creditsPlans.map((plan, index) => (
          <div
            key={index}
            className="p-5 mt-5 border rounded-xl max-w-2xl flex justify-between items-center"
          >
            <h2 className="text-xl flex gap-2 items-center">
              <CircleDollarSign /> <strong>{plan?.credits}</strong> Credits
            </h2>

            <div className="flex flex-col items-end">
              <div className="flex gap-3 items-center">
                <h2 className="font-medium text-xl">{plan.cost} $</h2>
                <Button onClick={() => setVisibleButtonIndex(index)}>
                  Buy Now
                </Button>
              </div>

              {/* Render PayPal Button only when "Buy Now" is clicked */}
              {visibleButtonIndex === index && (
                <div className="mt-3 w-full">
                  <PayPalButtons
                    style={{ layout: "horizontal" }}
                    forceReRender={[plan.cost, plan.credits]}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: plan.cost.toString(),
                              currency_code: "USD",
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={() => onPaymentSuccess(plan.cost, plan.credits)}
                    onCancel={() => {
                      toast("Payment Canceled!");
                      setVisibleButtonIndex(null);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Billing;



// "use client"
// import { useAuthContext } from "@/app/provider"
// import { Button } from "@/components/ui/button"
// import { PayPalButtons } from "@paypal/react-paypal-js"
// import { CircleDollarSign } from "lucide-react"
// import { toast } from "sonner" 
// import React from "react"
// import { useMutation } from "convex/react"
// import { api } from "@/convex/_generated/api"

// export const creditsPlans = [
//     {
//         credits: 10,
//         cost: 1
//     },
//     {
//         credits: 50,
//         cost: 5
//     },
//     {
//         credits: 100,
//         cost: 9
//     },
//     {
//         credits: 200,
//         cost: 15
//     },
//     {
//         credits: 500,
//         cost: 30
//     },
// ]
// function Billing() {
//     const { user, setUser } = useAuthContext();
//     const updateUserCredits = useMutation(api.users.UpdateUserCredits)
//     const onPaymentSuccess= async(cost, credits) => {
//         //Update User Credits
//         const result = await updateUserCredits({
//             uid: user?._id,
//             credits: Number(user?.credits)+Number(credits)
//         })
//         console.log(result);
//         setUser(prev => ({
//             ...prev,
//             credits: Number(user?.credits)+Number(credits)
//         }))

//         toast('Credits Added!')
//     }
//     return (
//       <div>
//         <h2 className='font-bold text-3xl'>Credits</h2>

//         <div className='p-4 border rounded-xl flex justify-between mt-7 max-w-2xl'>
//             <div>
//                 <h2 className='font-bold text-xl'>Total Credits Left</h2>
//                 <h2 className='text-sm'>1 Credits = 1 Video</h2>
//             </div>
//             <h2 className='font-bold text-3xl'>{user?.credits} Credits</h2>
//         </div>
//           <p className="text-sm p-5 text-gray-500 max-w-2xl">
//             When your credit balance reaches $0, your Video generation will stop
//             working. Add Credits balance topped up
//           </p>
//           <div className='mt-5'>
//             <h2 className='font-bold text-2xl'>Buy Credits</h2>

//             <div className=''>
//                 {creditsPlans.map((plan, index) => (
//                     <div key={index} className='p-5 mt-3 border rounded-xl max-w-2xl flex justify-between mt-7'>
//                         <h2 className='text-xl flex gap-2 items-center'>
//                             <CircleDollarSign/> <strong>{plan?.credits}</strong> Credits</h2>
//                         <div className='flex gap-2 items-center'>
//                             <h2 className='font-medium text-xl'>{plan.cost} $</h2>

//                             <Button>Buy Now</Button>
//                             <PayPalButtons style={{ layout: "horizontal" }}
//                             onApprove={() => onPaymentSuccess(plan?.cost, plan?.credits)}
//                             onCancel={() => toast('Payment Canceled!')}
//                             createOrder={(data, acttions) =>{
//                                 return acttions?.order?.create({
//                                     purchase_units: [
//                                         {
//                                             amount: {
//                                                 value: plan.cost,
//                                                 currency_code: 'USD',
//                                             }
//                                         }
//                                     ]
//                                 })
//                             }}
//                             />

//                         </div>
//                     </div>
//                 ))}
//             </div>
//           </div>
        
//       </div>
//     );
// }

// export default Billing;
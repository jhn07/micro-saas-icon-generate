"use client";

import { useLoading, useUserLimit } from "@/lib/store-chat";
import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils";

const Chat = () => {

  const userLimitCount = useUserLimit((state) => state.userLimitCount)
  const setuserLimitCount = useUserLimit((state) => state.setUserLimitCount)
  const isLoading = useLoading((state) => state.isLoading)
  const setLoading = useLoading((state) => state.setLoading)


  const [responseUrlAi, setResponseUrlAi] = useState<string | null>(null)
  const [colorPick, setColorPick] = useColor("#561ecb")
  const [colors, setColors] = useState<string[]>([])
  const [userPrompt, setUserPrompt] = useState({
    prompt: "",
    color: "",
    model: ""
  })


  useEffect(() => {
    const generateColors = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
    const randomColors = Array.from({ length: 28 }, generateColors)
    setColors(randomColors)
  }, [])


  const toggleModel = () => {
    setUserPrompt((state) => ({
      ...state,
      model: state.model === "Dalle-2" ? "" : "Dalle-2"
    }))
  }


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (userLimitCount === 0) {
      alert("You have apgrade Pro-Plan")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/generate-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...userPrompt,
          color: colorPick.hex || userPrompt.color
        })
      })

      if (!res.ok) {
        throw new Error("Thomthing went wrong")
      }

      const { userLimit, imageUrl } = await res.json()

      console.log({ userLimit, imageUrl })
      setResponseUrlAi(imageUrl)
      setuserLimitCount(userLimit)

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="max-w-5xl h-screen mx-auto grid grid-cols-1 gap-5 mt-5 md:grid-cols-2">
      <div className="">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 md:p-0">
          <div className="flex flex-col gap-1.5">
            <label className="text-lg text-zinc-700">
              1. Describe your icon using a noun and adjective
            </label>
            <Input
              type="text"
              placeholder="an angry cat"
              value={userPrompt.prompt}
              onChange={(e) => setUserPrompt((state) => ({ ...state, prompt: e.target.value }))}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-lg text-zinc-700">
              2. Select a primary color for your icon
            </label>
            <Tabs defaultValue="predefined" className="w-full">
              <TabsList className="flex justify-center">
                <TabsTrigger value="predefined">Predefined</TabsTrigger>
                <TabsTrigger value="picker">Picker</TabsTrigger>
              </TabsList>
              <TabsContent value="predefined">
                <div className="flex justify-between flex-wrap gap-3 p-1.5">
                  {colors.map((color: string, idx) => (
                    <label key={idx}
                      className={cn(
                        "color-radio h-14 w-14 appearance-none rounded-lg duration-300 cursor-pointer opacity-50 border border-black hover:opacity-100 hover:scale-110 hover:duration-300 active:scale-125",
                        userPrompt.color === color && "scale-110 opacity-100"
                      )}
                      style={{ backgroundColor: color }}
                    >
                      <Input
                        type="radio"
                        value={color}
                        onChange={(e) => setUserPrompt((state) => ({ ...state, color: e.target.value }))}
                        checked={userPrompt.color === color}
                        className="h-14 w-14 hidden"
                        readOnly
                      />
                    </label>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="picker">
                <div className="flex flex-col gap-2 p-1.5">
                  <ColorPicker
                    color={colorPick}
                    onChange={setColorPick}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-lg text-zinc-700">
              3. Model type {userPrompt.model}
            </label>
            <div className={cn(
              "h-16 w-16 border rounded-md cursor-pointer duration-300",
              userPrompt.model === "Dalle-2" && "duration-300 scale-110"
            )}
              onClick={toggleModel}
            >
              <Input
                type="radio"
                className="h-16 w-16 hidden"
                value="Dalle-2"
                checked={userPrompt.model === "Dalle-2"}
                readOnly
              />
              <Image
                src="/reviews/coin.png"
                alt="coin"
                width={70}
                height={70}
                className="object-contain w-full h-full rounded-md"
              />
            </div>
            <span className="ml-1.5">Dalle-2</span>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              {isLoading ? "Generated..." : "Generate"}
            </Button>
          </div>
        </form>
      </div>
      <div className="p-3 flex items-center justify-center">
        {isLoading ? (
          <p>Generated...</p>
        ) : responseUrlAi ? (
          <Link target="_blank" href={responseUrlAi}>
            <Image
              src={responseUrlAi}
              alt="icon"
              width={768}
              height={768}
              className="rounded-md border shadow-lg"
            />
          </Link>
        ) : (
          <p>Icon will appear here</p>
        )}
      </div>
    </div>
  )
}

export default Chat
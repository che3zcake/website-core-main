"use client"

import { useRef, useEffect, memo } from "react"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js"
import { cn } from "@/lib/utils"

interface ParticlePlanetProps {
  className?: string
  particleCount?: number
}

export const ParticlePlanet = memo(function ParticlePlanet({
  className,
  particleCount = 20000,
}: ParticlePlanetProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (container.querySelector("canvas")) return

    // ═══ ANNOTATION SYSTEM ═══
    const isMobile = container.clientWidth < 768
    const annContainer = document.createElement("div")
    annContainer.style.cssText = `position:absolute;inset:0;pointer-events:none;overflow:hidden;${isMobile ? "display:none;" : ""}`
    container.appendChild(annContainer)

    const annStore: Record<string, { el: HTMLDivElement; pos: THREE.Vector3; lbl: HTMLElement }> = {}

    function annotate(id: string, posVec: THREE.Vector3, labelText: string) {
      if (!annStore[id]) {
        const el = document.createElement("div")
        el.style.cssText = "position:absolute;pointer-events:none;z-index:15;white-space:nowrap;transition:opacity 0.3s;"
        el.innerHTML = `
          <div style="width:8px;height:8px;border-radius:50%;background:#00ff88;box-shadow:0 0 12px rgba(0,255,136,0.7),0 0 4px rgba(0,255,136,0.9);position:absolute;left:-4px;top:-4px;"></div>
          <div style="position:absolute;left:4px;top:-1px;width:44px;height:2px;background:linear-gradient(90deg,rgba(0,255,136,0.9),rgba(0,255,136,0.5));transform-origin:left center;transform:rotate(-8deg);box-shadow:0 0 6px rgba(0,255,136,0.4);"></div>
          <div class="ann-label" style="position:absolute;left:48px;top:-12px;font-size:10px;letter-spacing:0.06em;font-weight:600;font-family:'SF Mono','Fira Code','Consolas',monospace;color:#00ff88;background:rgba(0,12,6,0.6);border:1.5px solid rgba(0,255,136,0.5);border-radius:20px;padding:4px 12px;text-shadow:0 0 8px rgba(0,255,136,0.35);box-shadow:0 0 14px rgba(0,255,136,0.1),inset 0 0 10px rgba(0,255,136,0.04);line-height:1.3;"></div>
        `
        annContainer.appendChild(el)
        annStore[id] = { el, pos: posVec.clone(), lbl: el.querySelector(".ann-label")! }
      }
      annStore[id].pos.copy(posVec)
      annStore[id].lbl.textContent = labelText
    }

    function updateAnnotations(cam: THREE.PerspectiveCamera) {
      if (!container) return
      const w2 = container.clientWidth * 0.5
      const h2 = container.clientHeight * 0.5
      const v = new THREE.Vector3()
      for (const id in annStore) {
        const a = annStore[id]
        v.copy(a.pos).project(cam)
        const sx = v.x * w2 + w2
        const sy = -v.y * h2 + h2
        const behind = v.z > 1
        a.el.style.left = sx + "px"
        a.el.style.top = sy + "px"
        a.el.style.opacity = behind ? "0" : "0.9"
      }
    }

    // ═══ THREE.JS SETUP ═══
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 2000)
    camera.position.set(0, 0, 260)

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      2.0, 0.5, 0
    )
    bloomPass.strength = 0.58
    bloomPass.radius = 0.0
    bloomPass.threshold = 0.13
    composer.addPass(bloomPass)

    // ── Instanced mesh ──
    const geometry = new THREE.TetrahedronGeometry(0.35)
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const N = particleCount
    const mesh = new THREE.InstancedMesh(geometry, material, N)
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    scene.add(mesh)

    const positions: THREE.Vector3[] = []
    const tmpC = new THREE.Color()
    for (let i = 0; i < N; i++) {
      positions.push(new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
      ))
      mesh.setColorAt(i, tmpC.setHSL(0.7, 0.5, 0.3))
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true

    const dummy = new THREE.Object3D()
    const target = new THREE.Vector3()
    const pColor = new THREE.Color()
    const clock = new THREE.Clock()

    let camAng = 0
    let animationId: number

    let scale = 90.5, warp = 0.4, pSize = 1.15, flowCtrl = 1.2
    const CL = 6, PI2 = 6.2831853, G = 2.399963
    const NODES_PER_CL = 7, TOTAL_NODES = CL * NODES_PER_CL

    const clX = [0.7457, -0.5878, -0.1045, 0.9000, -0.8634, 0.2108]
    const clY = [1.0000,  0.6000,  0.2000, -0.2000, -0.6000, -1.0000]
    const clZ = [0.6667,  0.8090, -0.9945,  0.4339,  0.5048, -0.9776]
    const clH = [0.58, 0.68, 0.76, 0.85, 0.92, 0.63]
    const clNames = ["Auth Service", "API Gateway", "Data Models", "Event Bus", "Config & Env", "Utils & Helpers"]
    const clDescs = ["JWT · OAuth · Sessions", "Routes · Middleware", "Schema · ORM · Migrations", "Pub/Sub · Webhooks", "Env Vars · Secrets", "Logging · Validation"]

    const cnX: number[] = [], cnY: number[] = [], cnZ: number[] = []
    for (let c = 0; c < CL; c++) {
      const ll = Math.sqrt(clX[c]*clX[c] + clY[c]*clY[c] + clZ[c]*clZ[c]) + 0.001
      cnX.push(clX[c]/ll); cnY.push(clY[c]/ll); cnZ.push(clZ[c]/ll)
    }

    // ═══ MAIN LOOP ═══
    function animate() {
      animationId = requestAnimationFrame(animate)
      const time = clock.getElapsedTime()
      const count = N


      camAng += 0.0003
      camera.position.x = Math.sin(camAng) * 250
      camera.position.y = Math.sin(time * 0.06) * 10
      camera.position.z = Math.cos(camAng) * 250
      camera.lookAt(0, 0, 0)

      const t = time * 0.4

      for (let i = 0; i < count; i++) {
        const layerRaw = (i * 7) % 10
        const layer = layerRaw === 0 ? 0 : layerRaw <= 4 ? 1 : layerRaw <= 6 ? 2 : layerRaw <= 8 ? 3 : 4

        const seed  = (i * 1.6180339887) % 1.0
        const seed2 = (i * 2.3998775) % 1.0
        const seed3 = (i * 0.7548776) % 1.0

        let px = 0, py = 0, pz = 0
        let h = 0.7, s = 0.5, l = 0.4

        const nodeIdx = i % TOTAL_NODES
        const clIdx = nodeIdx % CL
        const nodeOff = Math.floor(nodeIdx / CL)

        const nox = cnX[clIdx] + Math.sin(nodeOff * 2.1 + 0.5) * 0.22
        const noy = cnY[clIdx] + Math.cos(nodeOff * 3.7 + 1.2) * 0.22
        const noz = cnZ[clIdx] + Math.sin(nodeOff * 1.3 + 2.8) * 0.22
        const nLen = Math.sqrt(nox*nox + noy*noy + noz*noz) + 0.001
        const shell = 0.7 + (nodeOff % 3) * 0.15
        const breathe = 1.0 + 0.03 * Math.sin(t * 1.2 + nodeOff * 0.7)
        const ncx = (nox/nLen*shell) * scale * breathe
        const ncy = (noy/nLen*shell) * scale * breathe
        const ncz = (noz/nLen*shell) * scale * breathe

        if (layer === 0) {
          const kn = seed
          const cPhi = seed2 * PI2 * 50 + i * 0.01
          const cTheta = Math.acos(1 - 2 * kn)
          const coreR = 3.5 * (0.05 + 0.95 * Math.pow(kn, 0.6))
          px = ncx + Math.sin(cTheta)*Math.cos(cPhi)*coreR
          py = ncy + Math.sin(cTheta)*Math.sin(cPhi)*coreR
          pz = ncz + Math.cos(cTheta)*coreR
          h = clH[clIdx]; s = 0.25 + 0.15*kn; l = 0.8 + 0.15*(1-kn)
        } else if (layer === 1) {
          const hPhi = seed*G*80+i*0.007
          const hTheta = Math.acos(1-2*((i*0.618034)%1))
          const hR = 14*(0.08+0.92*Math.pow(seed2,0.28))
          const snx=Math.sin(hTheta)*Math.cos(hPhi)
          const sny=Math.sin(hTheta)*Math.sin(hPhi)
          const snz=Math.cos(hTheta)
          const hw1=Math.sin(snx*3+t*0.6)*Math.cos(sny*2.5-t*0.4)*warp*0.8
          const hw2=Math.sin(sny*4-t*0.5)*Math.cos(snz*3+t*0.7)*warp*0.5
          const tendril=Math.pow(Math.abs(Math.sin(hPhi*2.5+hTheta*2+t)),0.5)*warp*0.2
          const wR=hR*(1.0+hw1*0.35+hw2*0.2)
          px=ncx+snx*wR+tendril*snx*hR*0.5
          py=ncy+sny*wR+tendril*sny*hR*0.4
          pz=ncz+snz*wR+tendril*snz*hR*0.3
          const dfc=Math.sqrt((px-ncx)**2+(py-ncy)**2+(pz-ncz)**2)/(hR*2+0.01)
          h=clH[clIdx]+0.04*Math.sin(seed*6.28+t*0.15)
          h=((h%1)+1)%1
          s=0.6+0.3*(1-dfc*0.3)
          l=0.25+0.55*Math.pow(Math.max(0,1-dfc),1.2)
        } else if (layer === 2) {
          const edgeIdx = i % 15
          const clA = edgeIdx % CL
          const clB = (edgeIdx+1+Math.floor(edgeIdx/CL)) % CL
          const fT = (seed + time * flowCtrl * 0.08 + edgeIdx * 0.05) % 1.0
          const emx=(cnX[clA]+cnX[clB])*0.5, emy=(cnY[clA]+cnY[clB])*0.5, emz=(cnZ[clA]+cnZ[clB])*0.5
          const mLen=Math.sqrt(emx*emx+emy*emy+emz*emz)+0.001
          const cmx=emx/mLen*0.9, cmy=emy/mLen*0.9, cmz=emz/mLen*0.9
          const u=fT, om=1-u
          const bE=1.0+0.03*Math.sin(t*1.2)
          const eS=scale*bE*0.85
          let ex=om*om*cnX[clA]*eS+2*om*u*cmx*scale*bE+u*u*cnX[clB]*eS
          let ey=om*om*cnY[clA]*eS+2*om*u*cmy*scale*bE+u*u*cnY[clB]*eS
          let ez=om*om*cnZ[clA]*eS+2*om*u*cmz*scale*bE+u*u*cnZ[clB]*eS
          const sc=0.8*warp*Math.sin(fT*3.14159)*0.5
          const sA=i*G+time*0.35
          ex+=Math.sin(sA)*sc; ey+=Math.cos(sA*1.3)*sc; ez+=Math.sin(sA*0.7+1)*sc
          px=ex; py=ey; pz=ez
          const blH=clH[clA]+(clH[clB]-clH[clA])*fT
          h=((blH%1)+1)%1; s=0.6
          l=0.25+0.45*Math.sin(fT*3.14159)*(0.6+0.4*Math.sin(time*0.7+edgeIdx))
        } else if (layer === 3) {
          const phi = seed * PI2
          const theta = Math.acos(seed2 * 2 - 1)
          const rBase = seed3 < 0.55 ? (0.82 + seed * 0.2) : Math.pow(seed3, 0.33)
          const sx = Math.sin(theta) * Math.cos(phi)
          const sy = Math.sin(theta) * Math.sin(phi)
          const sz = Math.cos(theta)
          const w1 = Math.sin(sx * 4 + t * 0.5) * Math.cos(sy * 3 - t * 0.3) * warp
          const w2 = Math.cos(sz * 3.5 + t * 0.4) * Math.sin(sx * 2.5 + t * 0.6) * warp * 0.6
          const rF = (rBase + w1 * 0.05 + w2 * 0.03) * scale
          px = sx * rF; py = sy * rF; pz = sz * rF
          let bestD = 999, bestC = 0
          for (let c = 0; c < CL; c++) {
            const dx = sx*rBase-cnX[c], dy = sy*rBase-cnY[c], dz = sz*rBase-cnZ[c]
            const dd = dx*dx+dy*dy+dz*dz
            if (dd<bestD){bestD=dd;bestC=c}
          }
          const depthFade = 0.3+0.7*rBase
          h = clH[bestC]+0.015*Math.sin(phi*2+t*0.1)
          s = 0.45+0.25*depthFade; l = 0.12+0.18*depthFade
        } else {
          const dPhi=Math.acos(2*seed2-1)
          const dTheta=i*3.8832+t*0.03
          const dR=scale*1.7*Math.pow(Math.abs(Math.sin(seed*2.9)),0.3)
          px=Math.sin(dPhi)*Math.cos(dTheta)*dR
          py=Math.cos(dPhi)*dR*0.7
          pz=Math.sin(dPhi)*Math.sin(dTheta)*dR
          h=0.65+Math.sin(seed)*0.1; s=0.3
          const twinkle=Math.sin(t*4+i*0.37)*0.5+0.5
          l=(0.15+Math.abs(Math.sin(t*0.8+seed*5))*0.2)*(0.5+twinkle*0.5)
        }

        l = Math.max(0.05, Math.min(0.95, l))
        h = ((h%1)+1)%1

        target.set(px * pSize, py * pSize, pz * pSize)
        pColor.setHSL(h, s, l)

        positions[i].lerp(target, 0.1)
        dummy.position.copy(positions[i])
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
        mesh.setColorAt(i, pColor)

        // Annotations — only on first particle iteration
        if (i === 0) {
          for (let c = 0; c < CL; c++) {
            const lblR = scale * 0.95 * pSize
            annotate("cl"+c, new THREE.Vector3(cnX[c]*lblR, cnY[c]*lblR, cnZ[c]*lblR),
              clNames[c] + " — " + clDescs[c])
          }
        }
      }

      mesh.instanceMatrix.needsUpdate = true
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true

      updateAnnotations(camera)
      composer.render()
    }

    animate()

    function onResize() {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      composer.setSize(w, h)
    }

    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(animationId)
      renderer.dispose()
      composer.dispose()
      geometry.dispose()
      material.dispose()
      mesh.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
      if (container.contains(annContainer)) container.removeChild(annContainer)
    }
  }, [particleCount])

  return <div ref={containerRef} className={cn("relative h-full w-full", className)} />
})

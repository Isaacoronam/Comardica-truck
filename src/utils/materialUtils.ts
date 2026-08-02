import { Mesh, MeshStandardMaterial, Color } from 'three';
import { MESH_GROUPS } from '../types/truck.types';

export interface MaterialConfig {
  color: string;
  metalness: number;
  roughness: number;
}

export function applyMaterialToMesh(mesh: Mesh, config: MaterialConfig, preserveEmissive = true): void {
  if (!mesh || !(mesh as any).isMesh) return;

  const existing = mesh.material as MeshStandardMaterial | null;

  const newMat = new MeshStandardMaterial({
    color: new Color(config.color),
    metalness: config.metalness,
    roughness: config.roughness,
    envMapIntensity: existing?.envMapIntensity ?? 0.8,
  });

  // Preservar mapas y emisivo si existen
  if (preserveEmissive && existing) {
    if (existing.emissive) newMat.emissive = existing.emissive.clone();
    newMat.emissiveIntensity = existing.emissiveIntensity;
    if (existing.map) newMat.map = existing.map;
    if (existing.normalMap) newMat.normalMap = existing.normalMap;
    if (existing.roughnessMap) newMat.roughnessMap = existing.roughnessMap;
    if (existing.metalnessMap) newMat.metalnessMap = existing.metalnessMap;
    if (existing.aoMap) newMat.aoMap = existing.aoMap;
  }

  mesh.material = newMat;
  mesh.material.needsUpdate = true;
}

export function classifyMesh(meshName: string): 'body' | 'wheels' | 'bumpers' | 'details' | 'unknown' {
  const name = (meshName || '').toLowerCase();
  if (MESH_GROUPS.BODY.some(k => name.includes(k))) return 'body';
  if (MESH_GROUPS.WHEELS.some(k => name.includes(k))) return 'wheels';
  if (MESH_GROUPS.BUMPERS.some(k => name.includes(k))) return 'bumpers';
  if (MESH_GROUPS.DETAILS.some(k => name.includes(k))) return 'details';
  return 'unknown';
}

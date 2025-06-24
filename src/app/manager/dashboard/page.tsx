"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { artists } from "@/utils/artistData";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

export default function ManagerDashboard() {
  const [data, setData] = useState<typeof artists>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArtist, setSelectedArtist] = useState<typeof artists[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setData(artists);
  }, []);

  const filteredData = data.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewClick = (artist: typeof artists[0]) => {
    setSelectedArtist(artist);
    setIsDialogOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-7 py-10">
      <h1 className="text-3xl font-bold mb-6">Artist Submissions</h1>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search by name, category, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((artist) => (
                <TableRow key={artist.id}>
                  <TableCell>{artist.name}</TableCell>
                  <TableCell>{artist.category}</TableCell>
                  <TableCell>{artist.location}</TableCell>
                  <TableCell>{artist.feeRange}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewClick(artist)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedArtist && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedArtist.name}</DialogTitle>
              </DialogHeader>
              
              <div className="grid gap-6 mt-4">
                <div className="flex items-start gap-6">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative w-48 h-48 rounded-lg overflow-hidden"
                  >
                    <img
                      src={selectedArtist.image}
                      alt={selectedArtist.name}
                      className="object-cover"
                    />
                  </motion.div>
                  
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="font-semibold">Category</h3>
                      <p className="text-muted-foreground">{selectedArtist.category}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold">Location</h3>
                      <p className="text-muted-foreground">{selectedArtist.location}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold">Fee Range</h3>
                      <p className="text-muted-foreground">{selectedArtist.feeRange}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold">Languages</h3>
                      <p className="text-muted-foreground">{selectedArtist.language}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold">Bio</h3>
                  <p className="text-muted-foreground">{selectedArtist.bio}</p>
                </div>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
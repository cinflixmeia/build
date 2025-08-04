import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function TestPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Test Card</h2>
              <p className="text-muted-foreground mb-4">
                This is a test card to verify that the components are working correctly.
              </p>
              <Button>Test Button</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Another Test Card</h2>
              <p className="text-muted-foreground mb-4">
                This is another test card to verify styling.
              </p>
              <Button variant="outline">Outline Button</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
} 
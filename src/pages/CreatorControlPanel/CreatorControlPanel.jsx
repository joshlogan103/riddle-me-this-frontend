import { useEffect, useState } from "react"
import { Button, Flex, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router";
import { getHuntTemplatesByUser } from "../../services/serviceRoutes/huntTemplateServices";
import Loading from "../../components/Loading/Loading";
import HuntTemplateEntry from "../../components/HuntTemplateEntry/HuntTemplateEntry";


const CreatorControlPanel = () => {
  const [huntTemplates, setHuntTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/create-hunt')
  }

  useEffect(() => {
    const fetchHuntTemplates = async () => {
      try {
        const response = await getHuntTemplatesByUser()
        if (response.status == 200) {
          // console.log(response)
          setHuntTemplates(response.data)
          setLoading(false)
        }
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
    fetchHuntTemplates()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Flex align='center' justify='center' wrap='wrap' style={{marginTop: '20px'}} direction='column'>
        <Text style={{fontSize: '24px', marginBottom: '40px'}}>Creator Control Panel</Text>
        <Button 
          onClick={handleClick} 
          variant="surface" 
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#475569';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#1E293B';
          }}
        >
          Create New Hunt
        </Button>
        <HuntTemplateEntry hunts={huntTemplates} />
      </Flex>
    </>
  )
}

export default CreatorControlPanel